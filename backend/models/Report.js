const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');

const Report = sequelize.define('Report', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    userId: { type: DataTypes.INTEGER, allowNull: false, references: { model: User, key: 'id' } },
    personName: { type: DataTypes.STRING, allowNull: false },  // Name of the missing person
    age: { type: DataTypes.INTEGER, allowNull: false },       // Age of the person
    gender: { type: DataTypes.STRING, allowNull: false },     // Gender of the missing person
    lastSeenLocation: { type: DataTypes.STRING, allowNull: false }, // Last seen location
    contactPhone: { type: DataTypes.STRING, allowNull: false }, // Contact phone number of the reporter
    photo: { type: DataTypes.STRING, allowNull: true },       // Photo filename (optional)
}, {
    timestamps: true,  // Automatically adds createdAt and updatedAt fields
});

Report.belongsTo(User, { foreignKey: 'userId' });

module.exports = Report;
