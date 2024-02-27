const { getOpenAIResponse } = require("../services/openai");
const OpenAI = require("openai");
const mongoose = require("mongoose");
require("../models/threads");
const Thread = mongoose.model("threads");

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

const generateResponse = async (req, res) => {
  try {
    const response = await getOpenAIResponse(req.body.text, req.body.chatId, req.body.uid);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).send("An error has occured");
  }
};

const getThread = async (req, res) => {
  try {
    const threadExists = await Thread.findOne({ chatId: req.query.chatId});
    if (threadExists) {
      const { data } = await openai.beta.threads.messages.list(threadExists.threadId, {
        order: "asc",
        limit: 50,
      });
      res.status(200).json(data);
    } else {
      res.status(200).json([]);
    }
  } catch (error) {
    res.status(400).send("An error has occured");
  }
}

const getAllThreads = async (req, res) => {
  try {
    const threads = await Thread.find({uid: req.query.uid});
    res.status(200).json(threads);
  } catch (error) {
    res.status(400).send("An error has occured");
  }
}


const deleteThread = async (req, res) => { 
  try {
    const threadExists = await Thread.findOne({ uid: req.user.uid});
    if (threadExists) {
      await openai.beta.threads.delete(threadExists.threadId);
      await Thread.deleteOne({ uid: req.user.uid });
    }
    res.status(200).send("Thread deleted");
  } catch (error) {
    res.status(400).send("An error has occured");
  }
}

module.exports = { generateResponse, getThread, deleteThread, getAllThreads };