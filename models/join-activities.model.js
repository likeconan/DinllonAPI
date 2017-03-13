'use strict';
module.exports = function (sequelize, DataTypes) {
    var JoinActivities = sequelize.define('JoinActivities', {
        uuid: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
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
        activityId: {
            allowNull: false,
            type: DataTypes.UUID,
            references: {
                model: 'Activities',
                key: 'uuid'
            }
        },
        status: {
            type: DataTypes.INTEGER,
            //1 for applied; 2 for accepted; 3 for refused
        },
        informEmail: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        isDeleted: {
            type: DataTypes.BOOLEAN
        }
    },
        {
            classMethods: {
                associate: function (models) {
                    // associations can be defined here
                    models.JoinActivities.belongsTo(models.Users, { foreignKey: 'userId' })
                    models.JoinActivities.belongsTo(models.Activities, { foreignKey: 'activityId' })
                }
            }
        });
    return JoinActivities;
};