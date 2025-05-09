const User = require('./User');
const Report = require('./Report');
const HelpRequest = require('./HelpRequest');
const FoundPerson = require('./FoundPerson');
const AdminAction = require('./AdminAction');
Report.hasMany(FoundPerson, { foreignKey: 'reportId' });
FoundPerson.belongsTo(Report, { foreignKey: 'reportId' });
// Exporting all models
module.exports = {
    User,
    Report,
    HelpRequest,
    FoundPerson,
    AdminAction
};
