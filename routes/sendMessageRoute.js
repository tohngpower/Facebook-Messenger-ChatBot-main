const express = require('express');
const router = express.Router();
require('dotenv').config();

const { chatCompletion } = require('../helper/openaiApi');
const { sendMessage, setTypingOff, setTypingOn } = require('../helper/messengerApi');

router.post('/', async (req, res) => {
  try {
    console.log(req.body)
    let body = req.body;
    let senderId = body.senderId;
    let query = body.query;
    await setTypingOn(senderId);
    let result = await chatCompletion(query);
    console.log(result.response)
    
    await sendMessage(senderId, result.response);
    await setTypingOff(senderId);
    console.log(senderId);
    console.log(result.response);
  } catch (error) {
    console.log(error);
  }
  res.status(200).send('OK');
});

module.exports = {
  router
};
