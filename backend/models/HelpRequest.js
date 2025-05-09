const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');

const HelpRequest = sequelize.define('HelpRequest', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    userId: { 
        type: DataTypes.INTEGER, 
        allowNull: false, 
        references: { model: User, key: 'id' }
    },
    location: { type: DataTypes.STRING, allowNull: false },
    message: { type: DataTypes.TEXT, allowNull: false },  // Changed 'reason' to 'message'
    status: { 
        type: DataTypes.ENUM('pending', 'resolved'), 
        allowNull: false, 
        defaultValue: 'pending' 
    }
}, {
    timestamps: true
});

HelpRequest.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE' });

module.exports = HelpRequest;
