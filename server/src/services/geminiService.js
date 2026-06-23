const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const generateResponse = async (message) => {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: message,
  });

  return response.text;
};

module.exports = generateResponse;