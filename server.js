const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

const authToken = '692730cf-c046-479b-aa7a-f43253b956a8';

app.get('/api/places', async (req, res) => {
    try {
        const { keywords, refLocation } = req.query;
        const apiUrl = `https://atlas.mapmyindia.com/api/places/nearby/json?keywords=${keywords}&refLocation=${refLocation}`;
        
        const response = await axios.get(apiUrl, {
            headers: {
                Authorization: `Bearer ${authToken}`
            }
        });
        
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching data:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
