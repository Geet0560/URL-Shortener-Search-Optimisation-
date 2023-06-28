const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema({
  full: {
    type: String,
    required: true
  },
  short: {
    type: String,
    required: true
  },
  clicks: {
    type: Number,
    required: true
  },
  notes: {
    type: String,
    required: false
  }
});

module.exports = mongoose.model('Favorite', favoriteSchema);
