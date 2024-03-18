const Cities = require('../../models/cities-model');
const ZipCodes = require('../../models/zipcodes-model');

exports.citiesRelation = () => {
  Cities.hasMany(ZipCodes,{
    as: 'zipcodes',
    key: 'id',
    foreignKey: 'cityId',
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })

  ZipCodes.belongsTo(Cities,{
    as: 'city',
    key: 'id',
    foreignKey: 'cityId',
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
}
