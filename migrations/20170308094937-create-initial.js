'use strict';
module.exports = {
  up: function (queryInterface, Sequelize) {

    //Users table
    queryInterface.createTable('Users', {
      uuid: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING(25)
      },
      nickName: {
        type: Sequelize.STRING(20)
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
      isLocked: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      isDeleted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })

    
  },
  down: function (queryInterface, Sequelize) {
    queryInterface.dropTable('Users');
    
  }
};