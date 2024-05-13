//AIzaSyDXp4AHu6UlL1c9PS-fKI7g4S6-zXoIQDM
require("dotenv").config();
const express = require('express');
const app = express();

const cors=require('cors');
const corsOptions={
    origin:["http://localhost:3000","http://localhost:8085"]
}
app.use(cors(corsOptions));
app.use(express.json());

const { GoogleGenerativeAI } = require("@google/generative-ai");

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

app.post("/generate", async (req, res) => {
    const { prompt } = req.body;
    try {

        // For text-only input, use the gemini-pro model
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        res.send(text);
    } catch (error) {
        console.log(error);
        res.status(500).send("failed to generate text");

    }
})


app.listen(8080, console.log("server listening from port 8080"));