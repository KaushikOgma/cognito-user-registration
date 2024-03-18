const Regions = require('../../models/regions-model');
const ZipCodes = require('../../models/zipcodes-model');

exports.regionsRelation = () => {
  Regions.hasMany(ZipCodes,{
    as: 'zipCodes',
    key: 'id',
    foreignKey: 'regionId',
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })

  ZipCodes.belongsTo(Regions,{
    as: 'region',
    key: 'id',
    foreignKey: 'regionId',
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
}
