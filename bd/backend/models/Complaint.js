const mongoose = require('mongoose');

const ComplaintSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  utility: {
    type: String,
    required: true,
  },
  wing: {
    type: String,
    required: true,
  },
  roomNo: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'in_progress', 'solved'],
    default: 'pending',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  worker: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  imageUrl: {
    type: String,
  },
}, { timestamps: true });

module.exports = mongoose.model('Complaint', ComplaintSchema);