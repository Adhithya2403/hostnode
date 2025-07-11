const express = require("express");
const cors = require("cors");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
const port = 3000;

// ✅ Use your updated key here
const GEMINI_API_KEY = "AIzaSyBfHIvsvIWFh46ghjQKwFJq9lTFWi1BMKw";

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

app.use(cors());
app.use(express.json());

app.post("/gemini", async (req, res) => {
  try {
    const prompt = req.body.prompt;
    const model = genAI.getGenerativeModel({ model: "models/gemini-1.5-flash" });

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    res.json({ result: text });
  } catch (error) {
    console.error("❌ Gemini API Error:", error.message);
    res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
});

app.listen(port, () => {
  console.log(`✅ Gemini Proxy Server running at http://localhost:${port}`);
});
