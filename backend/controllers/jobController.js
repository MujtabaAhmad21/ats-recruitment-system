const Job = require('../models/Job');

// 1. GET ALL JOBS (Public/Candidates)
exports.getJobs = async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 }); // Newest first
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching jobs', error: error.message });
  }
};

// 2. CREATE A JOB (HR Only)
exports.createJob = async (req, res) => {
  try {
    const { title, department, branch, availableSeats, description } = req.body;

    const newJob = new Job({
      title,
      department,
      branch,
      availableSeats,
      description,
      hrManager: req.user.id // Pulled automatically from the JWT token!
    });

    const savedJob = await newJob.save();
    res.status(201).json(savedJob);
  } catch (error) {
    res.status(500).json({ message: 'Error creating job', error: error.message });
  }
};
