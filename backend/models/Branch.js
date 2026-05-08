const mongoose = require('mongoose');

const branchSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true }, // e.g., 'Islamabad', 'Lahore', 'Karachi', 'Remote' [cite: 120-125]
  address: { type: String },
  contactEmail: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Branch', branchSchema);