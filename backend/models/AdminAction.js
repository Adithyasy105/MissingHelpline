const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); 
const User = require('./User');

const AdminAction = sequelize.define('AdminAction', {
  id: { 
    type: DataTypes.INTEGER, 
    autoIncrement: true, 
    primaryKey: true 
  },
  userId: { 
    type: DataTypes.INTEGER, 
    allowNull: false, 
    references: { model: 'users', key: 'id' } // Corrected reference
  },
  actionType: { 
    type: DataTypes.STRING, 
    allowNull: false 
  },
  targetId: { 
    type: DataTypes.INTEGER, 
    allowNull: true // Allow null for cases where no specific target exists
  },
  details: { 
    type: DataTypes.STRING, 
    allowNull: false 
  }
});

AdminAction.belongsTo(User, { foreignKey: 'userId' });

module.exports = AdminAction;
