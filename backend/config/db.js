const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config(); // Load environment variables

const sequelize = new Sequelize(
  process.env.DB_NAME || 'missing_2_db',
  process.env.DB_USER || 'root',
  process.env.DB_PASSWORD || '',
  {
    host: process.env.DB_HOST || 'localhost',
    dialect: process.env.DB_DIALECT || 'mysql',
    logging: false,
  }
);


// Test the database connection
sequelize
  .authenticate()
  .then(() => console.log('✅ Database connection established successfully!'))
  .catch((err) => console.error('❌ Unable to connect to the database:', err));

module.exports = sequelize;
