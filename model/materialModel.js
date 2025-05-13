const mongoose = require("mongoose");

// const materialSchema = new mongoose.Schema({
//   title: {
//     type: String,
//     required: true,
//   },
//   description: String,
//   fileUrl: {
//     type: String,
//   },
//   uploadedBy: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User",
//   },
//   uploadedAt: {
//     type: Date,
//     default: Date.now,
//   },
// });

// module.exports = mongoose.model("material", materialSchema);

// const mongoose = require("mongoose");

//new model
const materialSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  fileUrl: {
    type: String,
    required: true,
  },
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("material", materialSchema);
