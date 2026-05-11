const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  job: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
  candidate: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  resumeUrl: { type: String, required: true }, // Will store the Cloudinary PDF link
  coverLetterUrl: { type: String }, // Optional, will store the Cloudinary PDF/DOCX link
  status: { 
    type: String, 
    enum: ['Submitted', 'Under Review', 'Shortlisted', 'Interview Scheduled', 'Rejected', 'Selected'], 
    default: 'Submitted' 
  }
}, { timestamps: true });

module.exports = mongoose.model('Application', applicationSchema);
