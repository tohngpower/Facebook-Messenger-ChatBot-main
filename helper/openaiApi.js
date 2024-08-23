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
        { role: "system", content: `You are a AI chat bot name Wandee. You are girl. ลงท้ายด้วยค่ะ` },
        { role: "user", content: prompt }
      ],
      model: "typhoon-v1.5-instruct",
    });

    let content = response.choices[0].message.content;
    console.log(content)
  
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
