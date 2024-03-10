const { getOpenAIResponse } = require("../services/openai");
const OpenAI = require("openai");
const mongoose = require("mongoose");
require("../models/chats");
const Chat = mongoose.model("chats");
const fs = require("fs");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const generateResponse = async (req, res) => {
  try {
    const fileExists = await Chat.findOne({ chatId: req.body.chatId });

    // Check if file already exists
    if (fileExists && req.file) {
      //Delete the file
      fs.unlinkSync(req.file.path);
      return res
        .status(400)
        .send(
          "File already attached. Create a new chat to attach a different file."
        );
    }

    // Check file size (if file is present)
    if (req.file && req.file.size > 10000000) {
      // File size can be 10MB or less
      return res.status(400).send("File size too large");
    }

    // If no file or file is acceptable, proceed with generating response
    const response = await getOpenAIResponse(
      req.body.text,
      req.body.chatId,
      req.body.uid,
      req.file
    );
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(400).send("An error has occurred.");
  }
};

const getChat = async (req, res) => {
  try {
    const chatExists = await Chat.findOne({ chatId: req.body.chatId });
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
    const chats = await Chat.find({ uid: req.body.uid });
    res.status(200).json(chats);
  } catch (error) {
    res.status(400).send("An error has occured");
  }
};

const deleteChat = async (req, res) => {
  try {
    const chatExists = await Chat.findOne({ chatId: req.body.chatId }).where({
      uid: req.body.uid,
    });

    if (chatExists) {
      // Delete the assistant and file from OpenAI
      await openai.files.del(chatExists.fileId);
      // Delete the assistant from OpenAI
      await openai.beta.assistants.del(chatExists.assistantId);
      // Delete the chat data from the database
      await Chat.deleteOne({ chatId: req.body.chatId });
    }
    const chats = await Chat.find({ uid: req.body.uid });
    // res.status(200).send("Chat deleted");
    res.status(200).json(chats);
  } catch (error) {
    res.status(400).send("An error has occured");
  }
};

module.exports = { generateResponse, getChat, deleteChat, getAllChats };
