// ✅ Load Environment Variables
require('dotenv').config();

// ✅ Import Dependencies
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const path = require('path');
const sequelize = require('./config/db');
const rateLimit = require('express-rate-limit');

// ✅ Import Routes
const authRoutes = require('./routes/authRoutes');
const reportRoutes = require('./routes/reportRoutes');
const helpRequestRoutes = require('./routes/helpRequestRoutes');
const foundPersonRoutes = require('./routes/foundPersonRoutes');
const adminRoutes = require('./routes/adminRoutes');

// ✅ Initialize Express App
const app = express();

// ✅ Serve Static Uploads (Important: defined BEFORE helmet)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ✅ Global CORS Configuration
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));
// Allow static file access with correct headers
app.use('/uploads', (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// ✅ Helmet Configuration (allowing image access)
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      imgSrc: ["'self'", "http://localhost:5000", "data:"],
      styleSrc: ["'self'", "'unsafe-inline'"]
    }
  }
}));

// ✅ Middleware Configuration
app.use(express.json());
app.use(compression());
app.use(morgan('dev'));

// ✅ Rate Limiting
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests from this IP, please try again later.'
});
app.use('/api/', apiLimiter);

// ✅ API Routes
app.use('/api/auth', authRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/help-requests', helpRequestRoutes);
app.use('/api/found-persons', foundPersonRoutes);
app.use('/api/admin', adminRoutes);

// ✅ Fallback for Invalid Routes
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route not found!' });
});

// ✅ Global Error Handler
app.use((err, req, res, next) => {
  console.error('❌ Error:', err);
  res.status(500).json({
    message: 'Internal Server Error',
    error: err.message
  });
});

// ✅ Start Server with DB Sync
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connected successfully!');

    await sequelize.sync({ alter: true });
    console.log('✅ Database synchronized successfully!');

    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    process.exit(1);
  }
};

startServer();
