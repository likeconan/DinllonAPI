'use strict';
module.exports = function (sequelize, DataTypes) {
    var Appraises = sequelize.define('Appraises', {
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
        basedOnActivityId: {
            allowNull: false,
            type: DataTypes.UUID,
            references: {
                model: 'Activities',
                key: 'uuid'
            }
        },
        appraisedBy: {
            allowNull: false,
            type: DataTypes.UUID,
            references: {
                model: 'Users',
                key: 'uuid'
            }
        },
        isLate: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        appraiseText: {
            type: DataTypes.STRING
        },
        isDislike: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        isShow: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
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
                    .Appraises
                    .belongsTo(models.Users, {foreignKey: 'userId'});
                models
                    .Appraises
                    .belongsTo(models.Users, {foreignKey: 'appraisedBy'});
                models
                    .Appraises
                    .belongsTo(models.Activities, {foreignKey: 'basedOnActivityId'});
            }
        }
    });
    return Appraises;
};