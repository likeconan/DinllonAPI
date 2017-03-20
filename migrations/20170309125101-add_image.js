'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */

    queryInterface.createTable('Images', {
      uuid: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      url: {
        allowNull: false,
        type: Sequelize.STRING
      },
      path: {
        allowNull: false,
        type: Sequelize.STRING
      },
      imageType: {
        allowNull: false,
        type: Sequelize.STRING
      },
      from: {
        allowNull: false,
        type: Sequelize.STRING
      },
      relatedId: {
        allowNull: false,
        type: Sequelize.UUID
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }, { logging: console.log });
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
    queryInterface.dropTable('Images');
  }
};
