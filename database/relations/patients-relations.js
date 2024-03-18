const Patients = require('../../models/patients-model');
const Profiles = require('../../models/profiles-model');
exports.patientsRelation = () => {
  Patients.hasMany(Profiles,{
    as: 'profiles',
    key: 'id',
    foreignKey: 'patientId',
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })

  Profiles.belongsTo(Patients,{
    as: 'patient',
    key: 'id',
    foreignKey: 'patientId',
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
}
