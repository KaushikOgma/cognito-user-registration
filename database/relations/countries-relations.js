const Countries = require('../../models/countries-model');
const States = require('../../models/states-model');

exports.countriesRelation =()=>{
  Countries.hasMany(States,{
    as: 'states',
    key: 'id',
    foreignKey: 'countryId',
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })

  States.belongsTo(Countries, {
    as: 'country',
    key: 'id',
    foreignKey: 'countryId',
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  });
}
