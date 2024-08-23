const { OpenAI } = require("openai");
require('dotenv').config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: process.env.BASE_URL,
});

const chatCompletion = async (prompt) => {

  try {

    const response = await openai.chat.completions.create({
      messages: [
        { role: "system", content: `You are a helpfull assistant.` },
        { role: "user", content: prompt }
      ],
      model: "typhoon-v1.5-instruct",
    });

    let content = response.choices[0].message.content;
  
    return {
      status: 1,
      response: content
    };
  } catch (error) {
    return {
      status: 0,
      response: 'Please check typhoon api key.'
    };
  }
};


module.exports = {
  chatCompletion
};
