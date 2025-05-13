const express = require('express');
const router = express.Router();
const LiveTest = require('../model/liveTestModel');

router.post('/add-questions', async (req, res) => {
  try {
    const { title, subject, description, duration, questions } = req.body;

    if (!title || !subject || !questions || questions.length === 0) {
      return res.status(400).json({ success: false, message: "Incomplete exam details" });
    }

    const liveTest = new LiveTest({ title, subject, description, duration, questions });
    await liveTest.save();

    res.status(201).json({ success: true, liveTest });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});
// Get all live tests
router.get('/', async (req, res) => {
  try {
    const tests = await LiveTest.find();
    res.status(200).json(tests);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});
// Get specific test by ID
router.get('/:id', async (req, res) => {
  try {
    const test = await LiveTest.findById(req.params.id);
    if (!test) {
      return res.status(404).json({ success: false, message: 'Test not found' });
    }
    res.status(200).json({ success: true, test });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});


module.exports = router;

