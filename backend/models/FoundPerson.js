/*const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Report = require('./Report');

const FoundPerson = sequelize.define('FoundPerson', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    reportId: { 
        type: DataTypes.INTEGER, 
        allowNull: false, 
        references: { model: Report, key: 'id' }
    },
    place: { type: DataTypes.STRING, allowNull: false },
    message: { type: DataTypes.TEXT, allowNull: false },
    contactPhone: { type: DataTypes.STRING, allowNull: false },
    photo: { type: DataTypes.STRING, allowNull: true },
    status: { 
        type: DataTypes.ENUM('pending', 'verified'), 
        allowNull: false, 
        defaultValue: 'pending' 
    }
}, {
    timestamps: true
});

FoundPerson.belongsTo(Report, { foreignKey: 'reportId', onDelete: 'CASCADE' });

module.exports = FoundPerson;*/
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Report = require('./Report');

// FoundPerson Model
const FoundPerson = sequelize.define('FoundPerson', {
    id: { 
        type: DataTypes.INTEGER, 
        autoIncrement: true, 
        primaryKey: true 
    },
    reportId: { 
        type: DataTypes.INTEGER, 
        allowNull: true,  // Allow null in case no report exists
        references: { 
            model: Report, 
            key: 'id' 
        }
    },
    place: { 
        type: DataTypes.STRING, 
        allowNull: false 
    },
    message: { 
        type: DataTypes.TEXT, 
        allowNull: false 
    },
    contactPhone: { 
        type: DataTypes.STRING, 
        allowNull: false 
    },
    photo: { 
        type: DataTypes.STRING, 
        allowNull: true 
    },
    status: { 
        type: DataTypes.ENUM('pending', 'verified'), 
        allowNull: false, 
        defaultValue: 'pending' 
    }
}, {
    timestamps: true
});

// Relationship with Report
FoundPerson.belongsTo(Report, { foreignKey: 'reportId', onDelete: 'CASCADE' });

module.exports = FoundPerson;

