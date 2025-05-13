const express = require('express');
const router = express.Router();
const { upload } = require('../middlewares/s3Upload');
const { requireSignIn, isInstructorOrAdmin } = require('../middlewares/authMiddleware');
const {
  saveS3VideoLectureMeta,
  getAllVideoLectures,
  getVideoLectureById,
  deleteVideoLecture,
} = require('../controllers/videoLectureController');

// ========== Upload video to S3 and save metadata ==========
router.post('/upload/video', requireSignIn, isInstructorOrAdmin, upload.single('video'), saveS3VideoLectureMeta);

// ========== Get all video lectures ==========
router.get('/', requireSignIn, getAllVideoLectures);

// ========== Get single video lecture by ID ==========
router.get('/:id', requireSignIn, getVideoLectureById);

// ========== Delete video lecture ==========
router.delete('/:id', requireSignIn, isInstructorOrAdmin, deleteVideoLecture);

module.exports = router;
