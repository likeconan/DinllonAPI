'use strict';
module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.createTable('Users', {
      uuid: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      nickName: {
        type: Sequelize.STRING
      },
      goingOn: {
        type: Sequelize.STRING
      },
      school: {
        type: Sequelize.STRING
      },
      work: {
        type: Sequelize.STRING
      },
      backPic: {
        type: Sequelize.STRING
      },
      headPic: {
        type: Sequelize.STRING
      },
      mobile: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      birthday: {
        type: Sequelize.DATE
      },
      wechat: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: function (queryInterface, Sequelize) {
    queryInterface.dropTable('Users');
  }
};