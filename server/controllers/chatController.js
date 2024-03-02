const { getOpenAIResponse } = require("../services/openai");
const OpenAI = require("openai");
const mongoose = require("mongoose");
require("../models/chats");
const Chat = mongoose.model("chats");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const generateNewChat = async (req, res) => {
  try {
    console.log(req.file)
    const response = await getOpenAIResponse(
      req.body.text,
      req.body.chatId,
      req.body.uid,
      req.file
    );
    res.status(200).json(response);
  } catch (error) {
    res.status(400).send(error);
  }
};

const getChat = async (req, res) => {
  try {
    const chatExists = await Chat.findOne({ chatId: req.query.chatId });
    if (chatExists) {
      const { data } = await openai.beta.threads.messages.list(
        chatExists.threadId,
        {
          order: "asc",
          limit: 50,
        }
      );
      res.status(200).json(data);
    } else {
      res.status(200).json([]);
    }
  } catch (error) {
    res.status(400).send("An error has occured");
  }
};

const getAllChats = async (req, res) => {
  try {
    const chats = await Chat.find({ uid: req.query.uid });
    res.status(200).json(chats);
  } catch (error) {
    res.status(400).send("An error has occured");
  }
};

const deleteChat = async (req, res) => {
  try {
    const chatExists = await Chat.findOne({ uid: req.user.uid });
    if (chatExists) {
      await openai.beta.threads.delete(chatExists.threadId);
      await Chat.deleteOne({ uid: req.user.uid });
    }
    res.status(200).send("Chat deleted");
  } catch (error) {
    res.status(400).send("An error has occured");
  }
};

module.exports = { generateNewChat, getChat, deleteChat, getAllChats };
