require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(express.json()); // Allows us to parse JSON data from requests
app.use(cors());         // Enables Cross-Origin Resource Sharing

// Test Route
app.get('/', (req, res) => {
  res.send('ATS Recruitment API is running!');
});

// Database Connection & Server Initialization
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ Successfully connected to MongoDB Atlas (ats_db)');
    
    // We only start the server IF the database connects successfully
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('❌ Error connecting to MongoDB:', error.message);
  });