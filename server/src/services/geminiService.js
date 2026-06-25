const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const generateResponse = async (message) => {
  console.log("generateResponse called");

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: message,
    });

    console.log("SUCCESS");
    return response.text;
  } catch (error) {
    console.log("GEMINI ERROR START");
    console.log(error);
    console.log("GEMINI ERROR END");

    throw error;
  }
};

module.exports = generateResponse;