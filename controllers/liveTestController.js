const LiveTest = require('../model/liveTestModel');

// =================== Create Live Test ===================
exports.createLiveTest = async (req, res) => {
  try {
    const { title, subject, date, duration, link, instructor } = req.body;

    if (!title || !subject || !date || !duration || !link || !instructor) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields",
      });
    }

    const liveTest = new LiveTest({
      title,
      subject,
      date,
      duration,
      link,
      instructor,
    });

    await liveTest.save();

    res.status(201).json({
      success: true,
      message: "Live test created successfully",
      liveTest,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =================== Get All Live Tests ===================
exports.getAllLiveTests = async (req, res) => {
  try {
    const tests = await LiveTest.find().sort({ date: -1 });
    res.status(200).json({
      success: true,
      tests,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =================== Get Single Live Test ===================
exports.getLiveTestById = async (req, res) => {
  try {
    const test = await LiveTest.findById(req.params.id);
    if (!test) {
      return res.status(404).json({
        success: false,
        message: "Live test not found",
      });
    }
    res.status(200).json({
      success: true,
      test,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =================== Delete Live Test ===================
exports.deleteLiveTest = async (req, res) => {
  try {
    const test = await LiveTest.findByIdAndDelete(req.params.id);
    if (!test) {
      return res.status(404).json({
        success: false,
        message: "Live test not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Live test deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
