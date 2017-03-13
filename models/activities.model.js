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
                type: DataTypes.UUID,
                references: {
                    model: 'Users',
                    key: 'uuid'
                }
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
                // 1 for AA; 2 for myTreat; 3 for free
            },
            status: {
                type: DataTypes.INTEGER
                //1 for created; 2 for inprogress; 3 for success; 4 for failed
            },
            isDeleted: {
                type: DataTypes.BOOLEAN,
            }
        },
        {
            classMethods: {
                associate: function (models) {
                    // associations can be defined here
                    models.Activities.belongsTo(models.Users, { foreignKey: 'userId' })
                    models.Activities.hasMany(models.Images, { foreignKey: 'relatedId', constraints: false })
                }
            }
        });
    return Activities;
};