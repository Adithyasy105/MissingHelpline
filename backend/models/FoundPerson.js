const { DataTypes } = require('sequelize');
const Report = require('./Report'); 
const sequelize = require('../config/db');

const FoundPerson = sequelize.define(
  'FoundPerson',
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    reportId: { type: DataTypes.INTEGER, allowNull: false, references: { model: Report, key: 'id' } },
    place: { type: DataTypes.STRING, allowNull: false },
    message: { type: DataTypes.STRING, allowNull: false },
    contactPhone: { type: DataTypes.STRING, allowNull: false },
    photo: { type: DataTypes.STRING, allowNull: true } // ✅ Ensure 'photo' exists
  },
  {
    tableName: 'foundpeople', // ✅ Explicitly set correct table name
 
  }
);

FoundPerson.belongsTo(Report, { foreignKey: 'reportId' });

module.exports = FoundPerson;
