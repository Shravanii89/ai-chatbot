const generateResponse = require("../services/geminiService");

const chatController = async (req, res) => {
  try {
    console.log("CHAT HIT");

    const { message } = req.body;

    const reply = await generateResponse(message);

    res.json({ reply });
  } catch (error) {
    console.log("CONTROLLER ERROR");
    console.log(error);

    res.status(500).json({
      reply: "Something went wrong.",
    });
  }
};

module.exports = chatController;