// Import Required Modules
const Sequelize = require('sequelize');
const sequelize = require('../utilities/database');


// Defining Countries Model
const Countries = sequelize.define('countries', {
   id: {
      allowNull: false,
      autoIncrement: false,
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
   },
   code: {
      type: Sequelize.STRING,
      allowNull: true,
   },
   title: {
      type: Sequelize.STRING,
      allowNull: false,
   },
   description: {
      type: Sequelize.TEXT,
      allowNull: true,
      defaultValue: null,
   },
   isActive: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: true,
   },
   createdAt: {
      allowNull: false,
      defaultValue: Sequelize.fn('now'),
      type: Sequelize.DATE,
   },
   updatedAt: {
      allowNull: false,
      defaultValue: Sequelize.fn('now'),
      type: Sequelize.DATE,
   },
});

module.exports = Countries;