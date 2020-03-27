'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', 
    {name: Sequelize.STRING });
  },

  down: (queryInterface, Sequelize) => {
   return queryInterface.dropTable('users');
  }
};
