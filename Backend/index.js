const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/database');
const { errorHandler } = require('./utils/errorHandler');
const cookieParser = require('cookie-parser');

// Load env vars
dotenv.config();

// Connect to database
const app = express();

// Body parser
app.use(express.json());

const PROD_FRONTEND_URL = 'https://your-vercel-frontend-url.vercel.app';
const DEV_FRONTEND_URL = 'http://localhost:5173';

// Enable CORS
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? PROD_FRONTEND_URL
    : DEV_FRONTEND_URL,
  credentials: true
}));

// Add cookie parser
app.use(cookieParser());

// Mount routers
app.use('/api/auth', require('./routes/authRoutes'));

// Error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

// Connect to database before starting server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch((error) => {
  console.error('Database connection failed:', error);
  process.exit(1);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);
  // Close server & exit process
  process.exit(1);
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.log(`Error: ${err.message}`);
  process.exit(1);
});
