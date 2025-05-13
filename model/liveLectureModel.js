// models/liveLectureModel.js

const mongoose = require('mongoose');

const liveLectureSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    instructor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    // Add other fields relevant to your live lectures here (e.g., video URL, etc.)
  },
  { timestamps: true }
);

module.exports = mongoose.model('LiveLecture', liveLectureSchema);
