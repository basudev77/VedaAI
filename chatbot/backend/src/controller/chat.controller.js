require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.API_KEY);

exports.generateChat = async function (req, res) {
    try {
        const { query } = req.body;
        if (!query) {
            return res.status(400).json({ message: "Query is required" });
        }

        res.setHeader("Content-Type", "text/event-stream");
        res.setHeader("Cache-Control", "no-cache");
        res.setHeader("Connection", "keep-alive");

        const model = genAI.getGenerativeModel({ model: "gemini-2.5-pro" });

        const result = await model.generateContentStream(query);

        for await (const chunk of result.stream) {
            const text = await chunk.text();
            if (text && text.trim()) {
                res.write(`data: ${JSON.stringify(text)}\n\n`);  // stringify to keep SSE valid
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
