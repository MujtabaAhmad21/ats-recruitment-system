const express = require('express');
const router = express.Router();
const { applyForJob, getMyApplications, getHrApplications, updateApplicationStatus } = require('../controllers/applicationController');
const { protect, hrOnly } = require('../middleware/authMiddleware'); // <-- Added hrOnly
const upload = require('../config/cloudinary');

// Candidate Routes
router.post('/apply', protect, upload.single('resume'), applyForJob);
router.get('/my-applications', protect, getMyApplications);

// HR Routes
router.get('/hr-applications', protect, hrOnly, getHrApplications);
router.put('/:id/status', protect, hrOnly, updateApplicationStatus);

module.exports = router;
