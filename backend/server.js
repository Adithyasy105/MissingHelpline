const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const sequelize = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const reportRoutes = require('./routes/reportRoutes');
const helpRequestRoutes = require('./routes/helpRequestRoutes');
const foundPersonRoutes = require('./routes/foundPersonRoutes');
const adminRoutes = require('./routes/adminRoutes');

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/help-requests', helpRequestRoutes);
app.use('/api/found-persons', foundPersonRoutes);
app.use('/api/admin', adminRoutes);


// Database Connection
const PORT = process.env.PORT || 5000;
sequelize
  .sync()
  .then(() => {
    console.log('✅ Database synchronized successfully!');
    app.listen(PORT, () => {
      console.log(`🎉 Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('❌ Database connection failed:', error);
  });
