'use strict';
module.exports = function (sequelize, DataTypes) {
    var InviteActivities = sequelize.define('InviteActivities', {
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
        invitedBy: {
            allowNull: false,
            type: DataTypes.UUID,
            references: {
                model: 'Users',
                key: 'uuid'
            }
        },
        status: {
            type: DataTypes.INTEGER,
            //1 for invited 2 for accept 3 for refuse
        },
        isDeleted: {
            type: DataTypes.BOOLEAN
        }
    },
        {
            classMethods: {
                associate: function (models) {
                    // associations can be defined here
                    models.InviteActivities.hasOne(models.JoinActivities, { foreignKey: 'inviteId' })
                    models.InviteActivities.belongsTo(models.Users, { foreignKey: 'userId' })
                    models.InviteActivities.belongsTo(models.Users, { foreignKey: 'invitedBy' })
                }
            }
        });
    return InviteActivities;
};