const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config(); // Loads environment variables

const app = express();
app.use(express.json());
app.use(cors());

const OPENAI_API_KEY = process.env.OPENAI_API_KEY; // Securely use the API Key

app.post('/translate', async (req, res) => {
    try {
        const { text } = req.body;
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: 'gpt-4o',
            messages: [
                { role: 'system', content: 'Translate the following text to Vietnamese without changing its structure.' },
                { role: 'user', content: text }
            ],
            temperature: 0.7
        }, {
            headers: {
                Authorization: `Bearer ${OPENAI_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        res.json({ translatedText: response.data.choices[0].message.content.trim() });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(3000, () => console.log('✅ Server running on port 3000'));
