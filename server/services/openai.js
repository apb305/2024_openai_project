const mongoose = require("mongoose");
const OpenAI = require("openai");
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

const createThreadAndRunAssistant = async (openai, assistant, uid, text) => {
  const chatId = uuidv4();
  const thread = await openai.beta.threads.create();
  await openai.beta.threads.messages.create(thread.id, {
    role: "user",
    content: text,
    metadata: { chatId: chatId },
  });

  const run = await openai.beta.threads.runs.create(thread.id, {
    assistant_id: assistant.id,
  });

  await Chat.create({
    uid: uid,
    threadId: thread.id,
    chatId: chatId,
    chatTitle: text,
  });

  await waitForRunCompletion(openai, thread.id, run.id);

  const { data } = await openai.beta.threads.messages.list(thread.id, {
    order: "asc",
    limit: 50,
  });

  return { data, chatId };
};

const getOpenAIResponse = async (text, chatId, uid) => {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  // const file = await openai.files.create({
  //   file: fs.createReadStream("chat.txt"),
  //   purpose: "assistants",
  // });

  //Retrieve assistant
  const assistant = await openai.beta.assistants.retrieve(
    process.env.ASSISTANT_ID,
  );

  //Retrieve assistant
  // const assistant = await openai.beta.assistants.create(
  //   (name = "Terrific Travels"),
  //   (instructions =
  //     "You are a helpful assistance named Jake, and your job is to review the knowledge base documents that are uploaded and help provide answers to solutions. Rules: 1. Only use the provided context 2. Always ask if the users question was answered."),
  //   (model = "gpt-4-1106-preview"),
  //   (tools = [{ type: "retrieval" }]),
  //   (file_ids = [file.id])
  // );

  //Check for existing thread
  const threadExists = await Chat.findOne({ chatId: chatId });

  if (threadExists) {
    const chatId = threadExists.chatId;

    // If thread exists, continue the conversation
    await openai.beta.threads.messages.create(threadExists.threadId, {
      role: "user",
      content: text,
    });

    const run = await openai.beta.threads.runs.create(threadExists.threadId, {
      assistant_id: assistant.id,
    });

    await waitForRunCompletion(openai, threadExists.threadId, run.id);

    const { data } = await openai.beta.threads.messages.list(
      threadExists.threadId,
      { order: "asc", limit: 50 }
    );

    return { data, chatId };
  } else {
    return createThreadAndRunAssistant(openai, assistant, uid, text);
  }
};

module.exports = { getOpenAIResponse };
