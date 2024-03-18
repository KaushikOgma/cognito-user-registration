const Role = require('../../models/roles-model');
const Patients = require('../../models/patients-model');

exports.rolesRelation =()=>{
  // Role Relations
  Role.hasMany(Patients, {
    as: 'patients',
    key: 'id',
    foreignKey: 'roleId',
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  });

  // Patient Relations
  Patients.belongsTo(Role, {
    as: 'role',
    key: 'id',
    foreignKey: 'roleId',
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  });
}
