const mongoose = require("mongoose");

const videoLectureSchema = new mongoose.Schema({
  title: String,
  description: String,
  videoUrl: String,
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("VideoLecture", videoLectureSchema);
