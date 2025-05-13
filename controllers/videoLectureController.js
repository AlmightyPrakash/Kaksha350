const VideoLecture = require('../model/videoLectureModel'); // assuming your Mongoose model is here

exports.saveS3VideoLectureMeta = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!req.file || !title || !description) {
      return res.status(400).json({ success: false, message: 'Missing required fields or file.' });
    }

    const video = new VideoLecture({
      title,
      description,
      videoUrl: req.file.location,
      key: req.file.key,
    });

    await video.save();

    res.status(201).json({
      success: true,
      message: 'Video uploaded and metadata saved',
      video,
    });
  } catch (err) {
    console.error('Upload error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};


// ========== Get All Video Lectures ==========
exports.getAllVideoLectures = async (req, res) => {
  try {
    const videoLectures = await LiveLecture.find({ type: "video" }).populate("uploadedBy", "name email");
    res.status(200).json({
      success: true,
      videoLectures,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ========== Get Single Video Lecture by ID ==========
exports.getVideoLectureById = async (req, res) => {
  try {
    const videoLecture = await LiveLecture.findOne({ _id: req.params.id, type: "video" }).populate("uploadedBy", "name email");

    if (!videoLecture) {
      return res.status(404).json({
        success: false,
        message: "Video lecture not found",
      });
    }

    res.status(200).json({
      success: true,
      videoLecture,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ========== Delete Video Lecture ==========
exports.deleteVideoLecture = async (req, res) => {
  try {
    const deleted = await LiveLecture.findOneAndDelete({ _id: req.params.id, type: "video" });

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Video lecture not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Video lecture deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
