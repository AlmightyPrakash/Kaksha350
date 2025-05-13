const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const StudyMaterial = require('../model/materialModel');
const { upload, uploadFileToS3 } = require('../middlewares/uploadMaterialToS3');

// Ensure temp folder exists
const tempDir = path.join(__dirname, '../temp');
if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir, { recursive: true });
}

// Upload Material Route
router.post('/upload', upload.single('material'), async (req, res) => {
  try {
    const { title, description, subject } = req.body;
    const filePath = req.file.path;
    const fileUrl = await uploadFileToS3(filePath, req.file.filename);

    fs.unlinkSync(filePath); // Cleanup temp file

    const newMaterial = new StudyMaterial({
      title,
      description,
      subject,
      fileUrl, // ✅ fixed here
    });

    await newMaterial.save();

    res.status(201).json({
      success: true,
      material: newMaterial,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
