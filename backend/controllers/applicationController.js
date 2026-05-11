const Application = require('../models/Application');
const Job = require('../models/Job');

// 1. SUBMIT AN APPLICATION (Candidate Only)
exports.applyForJob = async (req, res) => {
  try {
    const { jobId } = req.body;
    
    if (!req.file) {
      return res.status(400).json({ message: 'Please upload a resume' });
    }

    const resumeUrl = req.file.path; 

    const existingApplication = await Application.findOne({ job: jobId, candidate: req.user.id });
    if (existingApplication) {
      return res.status(400).json({ message: 'You have already applied for this position.' });
    }

    const newApplication = new Application({
      job: jobId,
      candidate: req.user.id,
      resumeUrl: resumeUrl, 
      status: 'Submitted'
    });

    await newApplication.save();
    res.status(201).json({ message: 'Application submitted successfully!', application: newApplication });

  } catch (error) {
    res.status(500).json({ message: 'Error submitting application', error: error.message });
  }
};

// 2. GET CANDIDATE'S APPLICATIONS
exports.getMyApplications = async (req, res) => {
  try {
    const applications = await Application.find({ candidate: req.user.id })
      .populate('job', 'title department branch')
      .sort({ createdAt: -1 });
      
    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching your applications', error: error.message });
  }
};

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
