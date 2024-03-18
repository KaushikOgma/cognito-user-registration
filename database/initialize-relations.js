// Import All Models
const { rolesRelation } = require('./relations/role-relations');
const { countriesRelation } = require('./relations/countries-relations');
const { statesRelation } = require('./relations/states-relations');
const { citiesRelation } = require('./relations/cities-relations');
const { patientsRelation } = require('./relations/patients-relations');
const { relationshipTypesRelation } = require('./relations/relationship-types-relations');
const { regionsRelation } = require('./relations/regions-relations');


class InitializeRelations {
  // Initialize Model Relations
  static async initializeRelations() {
    rolesRelation()
    countriesRelation()
    statesRelation()
    citiesRelation()
    patientsRelation()
    relationshipTypesRelation()
    regionsRelation()

    console.log('Database Relationship Defined');
  }
}

module.exports = InitializeRelations;
