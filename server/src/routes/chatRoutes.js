const generateResponse = require("../services/geminiService");

const chatController = async (req, res) => {
  console.log("CHAT CONTROLLER HIT");

  try {
    const { message } = req.body;
    console.log("MESSAGE:", message);

    const reply = await generateResponse(message);

    res.json({ reply });
  } catch (error) {
    console.error("ERROR:", error);

    res.status(500).json({
      reply: "Something went wrong.",
    });
  }
};

module.exports = chatController;