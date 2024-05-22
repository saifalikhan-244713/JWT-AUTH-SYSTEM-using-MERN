const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
  email: { type: String, required: true },
  value: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Log', logSchema);
