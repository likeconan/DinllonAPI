'use strict';
module.exports = function (sequelize, DataTypes) {
    var Images = sequelize.define('Images', {
        uuid: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        url: {
            allowNull: false,
            type: DataTypes.STRING
        },
        imageType: {
            allowNull: false,
            type: DataTypes.STRING
        },
        momentId: {
            allowNull: false,
            type: DataTypes.UUID
        },
        isDeleted: {
            type: DataTypes.BOOLEAN
        }
    }, {
        classMethods: {
            associate: function (models) {
                // associations can be defined here
            }
        }
    });
    return Images;
};