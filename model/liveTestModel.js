const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: [{ type: String, required: true }],
  correctAnswer: { type: String, required: true },
});

const LiveTestSchema = new mongoose.Schema({
  title: String,
  subject: String,
  description: String,
  duration: Number,
  questions: [QuestionSchema],
}, { timestamps: true });

module.exports = mongoose.model('LiveTest', LiveTestSchema);
