// models/Report.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');


const Report = sequelize.define('Report', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  userId: { 
    type: DataTypes.INTEGER, 
    allowNull: false, 
    references: { model: User, key: 'id' }
  },
  personName: { type: DataTypes.STRING, allowNull: false },
  age: { type: DataTypes.INTEGER, allowNull: false },
  gender: { 
    type: DataTypes.ENUM('Male', 'Female', 'Other'), 
    allowNull: false 
  },
  lastSeenLocation: { type: DataTypes.STRING, allowNull: false },
  contactPhone: { type: DataTypes.STRING, allowNull: false },
  photo: { type: DataTypes.STRING, allowNull: true },
  status: { 
    type: DataTypes.ENUM('pending', 'found', 'closed'), 
    allowNull: false, 
    defaultValue: 'pending' 
  }
}, {
  timestamps: true
});

// Associations
Report.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE' });


module.exports = Report;
