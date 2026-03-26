const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Student data
const students = [
  { id: 1, name: 'Emma Johnson', admissionNo: 'STU-001', class: 'Form 4A', performance: 85, parentEmail: 'parent@email.com' },
  { id: 2, name: 'Liam Smith', admissionNo: 'STU-002', class: 'Form 4A', performance: 72, parentEmail: 'parent2@email.com' },
  { id: 3, name: 'Olivia Brown', admissionNo: 'STU-003', class: 'Form 4B', performance: 92, parentEmail: 'parent3@email.com' }
];

// ✅ ADD THIS - Welcome route for root URL
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'School ERP API is running!',
    version: '1.0',
    endpoints: {
      health: '/api/health',
      students: '/api/students',
      login: '/api/auth/login'
    },
    demoLogin: {
      admin: 'admin@school.com / admin123',
      teacher: 'teacher@school.com / teacher123'
    }
  });
});

// API Routes
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'School ERP API Running',
    timestamp: new Date().toISOString()
  });
});

app.get('/api/students', (req, res) => {
  res.json({ success: true, students });
});

app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;
  const validUsers = {
    'admin@school.com': { password: 'admin123', name: 'Admin', role: 'admin' },
    'teacher@school.com': { password: 'teacher123', name: 'Teacher', role: 'teacher' }
  };
  
  if (validUsers[username] && validUsers[username].password === password) {
    res.json({ 
      success: true, 
      user: { 
        username, 
        name: validUsers[username].name, 
        role: validUsers[username].role 
      } 
    });
  } else {
    res.status(401).json({ 
      success: false, 
      message: 'Invalid credentials' 
    });
  }
});

// ✅ ADD THIS - Handle any other routes
app.get('*', (req, res) => {
  res.status(404).json({ 
    success: false, 
    message: 'Route not found. Try /api/health or /api/students' 
  });
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
  console.log(`📝 Test the API at: http://localhost:${PORT}/api/health`);
});