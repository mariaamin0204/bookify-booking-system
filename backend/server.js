const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

dotenv.config();

// Connect Database
connectDB();

const app = express();

// Middleware
app.use(cors({
  origin: '*', // Allow requests from any origin (React frontend)
  credentials: true
}));
app.use(express.json());

// Request Logger (Routes se hamesha pehle aana chahiye)
app.use((req, res, next) => {
  console.log(`[${new Date().toLocaleTimeString()}] ${req.method} request to: ${req.url}`);
  next();
});

// Test Route
app.get('/', (req, res) => {
  res.send('SaaS Service Booking API is running...');
});

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/services', require('./routes/serviceRoutes'));
app.use('/api/bookings', require('./routes/bookingRoutes'));

// Global Error Handler (Agar koi internal server error aaye)
app.use((err, req, res, next) => {
  console.error("Backend Internal Error:", err.stack);
  res.status(500).json({ message: "Server Error: " + err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));