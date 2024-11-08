const mongoose = require('mongoose');

const wordSchema = new mongoose.Schema({
  word: { type: String, required: true },
  count: { type: Number, default: 1 }
});

const Word = mongoose.model('Word', wordSchema);
module.exports = Word;
