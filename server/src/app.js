const express = require("express");
const cors = require("cors");
require("dotenv").config();
console.log(process.env.GEMINI_API_KEY);

const chatRoutes = require("./routes/chatRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/", chatRoutes);

module.exports = app;
