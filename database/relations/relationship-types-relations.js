const RelationShipTypes = require('../../models/relationship-types-model');
const Profiles = require('../../models/profiles-model');

exports.relationshipTypesRelation = () => {
  RelationShipTypes.hasMany(Profiles,{
    as: 'profiles',
    key: 'id',
    foreignKey: 'relationTypeId',
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })

  Profiles.belongsTo(RelationShipTypes,{
    as: 'relationshipType',
    key: 'id',
    foreignKey: 'relationTypeId',
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
}
