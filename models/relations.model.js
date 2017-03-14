'use strict';
module.exports = function (sequelize, DataTypes) {
    var Relations = sequelize.define('Relations', {
        uuid: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4
        },
        userId: {
            allowNull: false,
            type: DataTypes.UUID,
            references: {
                model: 'Users',
                key: 'uuid'
            }
        },
        relatedUserId: {
            allowNull: false,
            type: DataTypes.UUID,
            references: {
                model: 'Users',
                key: 'uuid'
            }
        },
        status: {
            type: DataTypes.INTEGER,
            defaultValue: 1
        },
        isDeleted: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    }, {
        classMethods: {
            associate: function (models) {
                // associations can be defined here
                models
                    .Relations
                    .belongsTo(models.Users, {foreignKey: 'userId'});
                models
                    .Relations
                    .belongsTo(models.Users, {foreignKey: 'relatedUserId'});

            }
        }
    });
    return Relations;
};