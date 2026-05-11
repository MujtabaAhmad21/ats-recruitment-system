const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  department: { type: String, required: true },
  branch: { 
    type: String, 
    enum: ['Islamabad', 'Lahore', 'Karachi', 'Remote'], 
    required: true 
  },
  availableSeats: { type: Number, required: true, min: 1 },
  description: { type: String, required: true },
  // This links the job to the specific HR Admin who created it
  hrManager: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true } 
}, { timestamps: true });

module.exports = mongoose.model('Job', jobSchema);
