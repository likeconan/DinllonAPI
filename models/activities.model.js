'use strict';
module.exports = function (sequelize, DataTypes) {
    var Activities = sequelize.define('Activities',
        {
            uuid: {
                type: DataTypes.UUID,
                allowNull: false,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4
            },
            textContent: {
                type: DataTypes.STRING
            },
            userId: {
                allowNull: false,
                type: DataTypes.UUID
            },
            startedAt: {
                allowNull: false,
                type: DataTypes.DATE
            },
            cost: {
                allowNull: false,
                type: DataTypes.DECIMAL(10, 2),
            },
            type: {
                allowNull: false,
                type: DataTypes.INTEGER,
            },
            isDeleted: {
                type: DataTypes.BOOLEAN,
            }
        },
        {
            classMethods: {
                associate: function (models) {
                    // associations can be defined here
                }
            }
        });
    return Activities;
};