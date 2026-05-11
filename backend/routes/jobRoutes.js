const express = require('express');
const router = express.Router();
const { getJobs, createJob } = require('../controllers/jobController');
const { protect, hrOnly } = require('../middleware/authMiddleware');

// Public route: Anyone can view jobs
router.get('/', getJobs);

// Protected route: Only logged-in HR managers can create a job
router.post('/', protect, hrOnly, createJob);

module.exports = router;
