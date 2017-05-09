'use strict';
module.exports = function (sequelize, DataTypes) {
    var Moments = sequelize.define('Moments', {
        uuid: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        textContent: {
            type: DataTypes.STRING
        },
        type: {
            type: DataTypes.STRING
        },
        userId: {
            type: DataTypes.UUID,
            references: {
                model: 'Users',
                key: 'uuid'
            },
            allowNull: false
        },
        isDeleted: {
            type: DataTypes.BOOLEAN
        }
    }, {
            classMethods: {
                associate: function (models) {
                    // associations can be defined here
                    models.Moments.belongsTo(models.Users, {
                        foreignKey: 'userId'
                    });
                    models.Moments.hasMany(models.Images, {
                        foreignKey: 'relatedId',
                        constraints: false
                    });
                }
            }
        });

    return Moments;
};