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

    //Activities table
    queryInterface.createTable('Activities', {
      uuid: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      textContent: {
        type: Sequelize.STRING
      },
      userId: {
        allowNull: false,
        type: Sequelize.UUID,
        references: { model: 'Users', key: 'uuid' }
      },
      startedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      cost: {
        allowNull: false,
        type: Sequelize.DECIMAL(10, 2),
      },
      type: {
        allowNull: false,
        type: Sequelize.INTEGER,
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
    });

    //Moments table
    queryInterface.createTable('Moments', {
      uuid: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      textContent: {
        type: Sequelize.STRING
      },
      userId: {
        allowNull: false,
        type: Sequelize.UUID,
        references: { model: 'Users', key: 'uuid' }
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
    });

  },
  down: function (queryInterface, Sequelize) {
    queryInterface.dropTable('Users');
    queryInterface.dropTable('Activities');
    queryInterface.dropTable('Moments');
  }
};