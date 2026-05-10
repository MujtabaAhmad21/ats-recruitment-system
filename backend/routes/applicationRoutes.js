const express = require('express');
const router = express.Router();
const { applyForJob } = require('../controllers/applicationController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../config/cloudinary');

// POST: Candidate submits an application with a PDF resume
// 'resume' must match the name attribute of the file input in React
router.post('/apply', protect, upload.single('resume'), applyForJob);

module.exports = router;
