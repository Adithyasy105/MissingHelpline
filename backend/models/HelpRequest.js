const { DataTypes } = require('sequelize'); 
const sequelize = require('../config/db');
const User = require('./User');

const HelpRequest = sequelize.define('HelpRequest', {
  id: { 
    type: DataTypes.INTEGER, 
    autoIncrement: true, 
    primaryKey: true 
  },
  userId: { 
    type: DataTypes.INTEGER, 
    allowNull: true,  // Matches `YES` in `DESC helprequests`
    references: { model: User, key: 'id' } 
  },
  location: {  
    type: DataTypes.STRING, 
    allowNull: false // Ensures it's required
  },
  message: {  
    type: DataTypes.TEXT, 
    allowNull: false // Ensures it's required
  },
  status: { 
    type: DataTypes.STRING, 
    allowNull: false,  
    defaultValue: 'pending'  // Default matches the database case
  }
}, {
  timestamps: true // Ensures `createdAt` & `updatedAt` are managed
});

HelpRequest.belongsTo(User, { foreignKey: 'userId' });

module.exports = HelpRequest;
