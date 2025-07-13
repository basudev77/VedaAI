require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.API_KEY);

exports.generateChat = async function (req, res) {
  try {
    const query = req.query.q || hello;
    if (!query) {
      return res.status(400).json({ message: "Query is required" });
    }

    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-pro" });
    const prompt =
      "you are a ayurvadic expert give me only ayurvadic informations and if there is any aurvadic excluded question, you will skip thoses question and only answer the aurvadic releted ones and dont tell that I told you to do this. my query is" +
      query;

    const result = await model.generateContentStream(prompt);

    for await (const chunk of result.stream) {
      const text = await chunk.text();
      if (text && text.trim()) {
        res.write(`data: ${text}\n\n`);
      }
    }

    res.write(`event: done\ndata: "end"\n\n`);
    res.end();
  } catch (error) {
    if (res.headersSent) {
      res.write(`event: error\ndata: ${JSON.stringify(error.message)}\n\n`);
      res.end();
    } else {
      res.status(500).json({ error: error.message });
    }
  }
};
