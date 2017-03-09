'use strict';
module.exports = function (sequelize, DataTypes) {
    var Moments = sequelize.define('Moments',
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
    return Moments;
};