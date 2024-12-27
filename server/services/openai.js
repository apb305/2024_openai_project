const mongoose = require("mongoose");
const { OpenAI } = require("openai");
require("../models/chats");
const Chat = mongoose.model("chats");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");

const waitForRunCompletion = async (openai, threadId, runId) => {
  let completed = false;
  while (!completed) {
    const runStatus = await openai.beta.threads.runs.retrieve(threadId, runId);
    if (runStatus.status === "completed") {
      completed = true;
    } else {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }
};

const createThreadAndRunAssistant = async (openai, uid, text, newfile) => {

  const chatId = uuidv4();

  const fileStream = fs.createReadStream(newfile.path);

  const assistant = await openai.beta.assistants.create({
    instructions:
      "You are a helpful assistance named Jake, and your job is to review the files that are uploaded and help provide answers to solutions. Rules: 1. Only use the provided context.",
    name: "File Analyzer Assistant",
    model: "gpt-4o",
    tools: [{ type: "file_search" }]
  });

  const file = await openai.files.create({
    file: fileStream,
    purpose: "assistants",
  });

  let vectorStore = await openai.beta.vectorStores.create({
    name: newfile.originalname,
  });

  await openai.beta.vectorStores.fileBatches.createAndPoll(vectorStore.id, { file_ids: [file.id] });

  await openai.beta.assistants.update(assistant.id, {
    tool_resources: { file_search: { vector_store_ids: [vectorStore.id] } },
  });

  const thread = await openai.beta.threads.create();

  await openai.beta.threads.messages.create(thread.id, {
    role: "user",
    content: text,
    metadata: { chatId: chatId },
  });

  const run = await openai.beta.threads.runs.create(thread.id, {
    assistant_id: assistant.id,
  });

  //Save chat data to database
  await Chat.create({
    uid: uid,
    threadId: thread.id,
    chatId: chatId,
    chatTitle: newfile.originalname,
    assistantId: assistant.id,
    fileId: file.id,
  });

  //Delete the file
  fs.unlinkSync(fileStream.path);

  await waitForRunCompletion(openai, thread.id, run.id);

  const { data } = await openai.beta.threads.messages.list(thread.id, {
    order: "asc",
    limit: 50,
  });

  return { data, chatId };
};

const getOpenAIResponse = async (text, chatId, uid, newFile) => {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY, defaultHeaders: { "OpenAI-Beta": "assistants=v2" }
  });

  const threadExists = await Chat.findOne({ chatId: chatId });

  //Check for existing assistant thread
  if (threadExists) {
    const chatId = threadExists.chatId;

    //Create a new message
    await openai.beta.threads.messages.create(threadExists.threadId, {
      role: "user",
      content: text,
    });

    //Create a new run
    const run = await openai.beta.threads.runs.create(threadExists.threadId, {
      assistant_id: threadExists.assistantId,
    });

    await waitForRunCompletion(openai, threadExists.threadId, run.id);

    const { data } = await openai.beta.threads.messages.list(
      threadExists.threadId,
      { order: "asc", limit: 50 }
    );

    return { data, chatId };
  } else {
    return createThreadAndRunAssistant(openai, uid, text, newFile);
  }
};

module.exports = { getOpenAIResponse };
