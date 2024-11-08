const express = require('express');
const mongoose = require('mongoose');
const Word = require('./models/Word'); // Import the Word model

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

// Endpoint to add or update a word
app.post('/add-word', async (req, res) => {
  const { word } = req.body;
  try {
    let existingWord = await Word.findOne({ word });
    if (existingWord) {
      existingWord.count += 1;
      await existingWord.save();
    } else {
      const newWord = new Word({ word });
      await newWord.save();
    }
    res.json({ message: 'Word added/updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add/update word' });
  }
});

// Endpoint to get all words
app.get('/words', async (req, res) => {
  try {
    const words = await Word.find().sort({ count: -1 });
    res.json(words);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch words' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
