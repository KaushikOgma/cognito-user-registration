const States = require('../../models/states-model');
const Cities = require('../../models/cities-model');


exports.statesRelation = () => {
  States.hasMany(Cities,{
    as: 'cities',
    key: 'id',
    foreignKey: 'stateId',
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })

  Cities.belongsTo(States,{
    as: 'state',
    key: 'id',
    foreignKey: 'stateId',
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
}
