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
        path: {
            allowNull: false,
            type: DataTypes.STRING
        },
        imageType: {
            allowNull: false,
            type: DataTypes.STRING
        },
        from: {
            allowNull: false,
            type: DataTypes.STRING
        },
        relatedId: {
            allowNull: false,
            type: DataTypes.UUID,
        },
        isDeleted: {
            type: DataTypes.BOOLEAN
        }
    },
        {
            classMethods: {
                associate: function (models) {
                    // associations can be defined here
                    models.Images.belongsTo(models.Moments, { foreignKey: 'relatedId', constraints: false })
                    models.Images.belongsTo(models.Activities, { foreignKey: 'relatedId', constraints: false })
                }
            }
        });
    return Images;
};