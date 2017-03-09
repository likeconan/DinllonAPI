'use strict';
module.exports = function (sequelize, DataTypes) {
    var Users = sequelize.define('Users', {
        uuid: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        nickName: DataTypes.STRING,
        password: {
            allowNull: false,
            type: DataTypes.STRING,
            validate: {
                len: {
                    args: [
                        6, 25
                    ],
                    msg: "The password should be between 6-25"
                }
            }
        },
        goingOn: DataTypes.STRING,
        school: DataTypes.STRING,
        work: DataTypes.STRING,
        backPic: DataTypes.STRING,
        headPic: DataTypes.STRING,
        mobile: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                msg: 'Mobile should be unique'
            },
            validate: {
                notEmpty: {
                    msg: 'Mobile is a required field'
                },
                isNumeric: {
                    msg: 'Please enter valid mobile'
                }
            }
        },
        birthday: DataTypes.DATE,
        wechat: {
            type: DataTypes.STRING,
            unique: {
                msg: 'Wechat should be unique'
            },
            validate: {
                notEmpty: {
                    msg: 'Wechat is a required field'
                }
            }
        }
    }, {
        classMethods: {
            associate: function (models) {
                // associations can be defined here
            }
        }
    });
    return Users;
};