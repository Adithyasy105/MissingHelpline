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
        references: { model: User, key: 'id' }
    },
    actionType: { 
        type: DataTypes.STRING, 
        allowNull: false 
    },
    targetId: { 
        type: DataTypes.INTEGER, 
        allowNull: true // Allows for actions that may not target a specific entity
    },
    targetType: { 
        type: DataTypes.STRING, 
        allowNull: true, // This will specify what entity the action refers to (e.g., 'HelpRequest', 'FoundPerson')
    },
    details: { 
        type: DataTypes.TEXT, 
        allowNull: false 
    }
}, {
    timestamps: true
});

// Defining the relationship between AdminAction and User (an admin action is tied to a specific user)
AdminAction.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE' });

module.exports = AdminAction;
