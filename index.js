// Create a basic express server that listens on port 3000 and loads environment variables from a .env file
require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.get('/', (req, res) => {
    res.send('Express server working!');
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

// Create a get endpoint at /status that returns a JSON object with {status: 'ok', timestamp: current_timestamp}
app.get('/status', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date() });
});

// Create a post endpoint at /chat tthat recieves a JSON body with a "question" property, the question must not be empty, use OPENAI client to get the response, return a json response and handle errors
const { OpenAI } = require('openai');

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.post('/chat', async (req, res) => {
    const { question } = req.body;

    if (!question || typeof question !== 'string' || question.trim() === '') {
        return res.status(400).json({ error: 'Question is required and must be a non-empty string.' });
    }

    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: question }],
            max_tokens: 100,
        });
        const answer = response.choices[0].message.content;
        res.json({ answer });
    } catch (error) {
        console.error('Error communicating with OpenAI:', error);
        res.status(500).json({ error: 'Error communicating with OpenAI' });
    }
}); 