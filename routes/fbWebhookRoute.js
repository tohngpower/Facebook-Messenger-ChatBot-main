const express = require('express');
const router = express.Router();
require('dotenv').config();
const axios = require("axios").default;

router.get('/', (req, res) => {
  let mode = req.query['hub.mode'];
  let token = req.query['hub.verify_token'];
  let challenge = req.query['hub.challenge'];
  if (mode && token) {
    if (mode === 'subscribe' && token === process.env.VERIFY_TOKEN) {
      console.log('WEBHOOK_VERIFIED');
      res.status(200).send(challenge);
    } else {
      res.sendStatus(403);
    }
  }
});

const callSendMessage = async (url, senderId, query) => {
  let options = {
    method: 'POST',
    url: url,
    headers: {
      'Content-Type': 'application/json'
    },
    data: {
      senderId: senderId,
      query: query
    }
  };
  await axios.request(options)
}

router.post('/', async (req, res) => {
  try {
    console.log(req.body);
    const body = req.body;
    const senderId = body.value.sender.id;
    const query = body.value.message.text;
        
    const host = req.hostname;
    const requestUrl = `https://${host}/sendMessage`;
    console.log(host);

    await callSendMessage(requestUrl, senderId, query);
    console.log(senderId, query);

    res.status(200).send('OK');
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = {
  router
};
