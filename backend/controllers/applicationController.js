const Job = require('../models/Job'); // Make sure this is at the top of the file!

// 3. GET HR APPLICATIONS (HR Only)
exports.getHrApplications = async (req, res) => {
  try {
    // First, find all jobs created by this specific HR Manager
    const hrJobs = await Job.find({ hrManager: req.user.id }).select('_id');
    const jobIds = hrJobs.map(job => job._id);

    // Then, find all applications for those specific jobs
    const applications = await Application.find({ job: { $in: jobIds } })
      .populate('job', 'title branch')
      .populate('candidate', 'name email') // Pull in the candidate's contact info
      .sort({ createdAt: -1 });

    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching applications', error: error.message });
  }
};

// 4. UPDATE APPLICATION STATUS (HR Only)
exports.updateApplicationStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const application = await Application.findByIdAndUpdate(
      req.params.id, 
      { status }, 
      { new: true }
    );

    if (!application) return res.status(404).json({ message: 'Application not found' });

    res.status(200).json({ message: 'Status updated successfully', application });
  } catch (error) {
    res.status(500).json({ message: 'Error updating status', error: error.message });
  }
};
