const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Simple API endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'School ERP Backend is running!',
    timestamp: new Date()
  });
});

// Student API endpoint (demo)
app.get('/api/students', (req, res) => {
  res.json({
    success: true,
    students: [
      { id: 1, name: 'Emma Johnson', class: 'Form 4A', performance: 85 },
      { id: 2, name: 'Liam Smith', class: 'Form 4A', performance: 72 },
      { id: 3, name: 'Olivia Brown', class: 'Form 4B', performance: 92 }
    ]
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📝 API URL: http://localhost:${PORT}/api/health`);
});