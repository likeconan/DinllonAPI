var BaseCtrl = require('./base.controller');
var UserReturnModel = require('../returnmodels').UserReturnModel;
var jwt = require('jsonwebtoken');

class UserController extends BaseCtrl {
    constructor(lib) {
        super(lib);
        this.initalAction(lib);

    }
    initalAction(lib) {

        //Get users
        super.addAction({
            path: '/users',
            method: 'GET'
        }, (req, res, next) => {
            super.excuteDb(res, next, {
                dbModel: 'Users',
                method: 'findAll',
                object: {
                    attributes: {
                        exclude: ['password']
                    },
                    where: {
                        isDeleted: false
                    },
                    order: [
                        ['createdAt', 'DESC']
                    ]
                }
            }, (data) => {
                res.send({
                    isSuccess: true,
                    data: data
                });
                next();
            });

        });

        //Get user by id
        super.addAction({
            path: '/users/id/:id',
            name: 'getuser_profile_ignore',
            method: 'GET'
        }, (req, res, next) => {
            super.excuteDb(res, next, {
                dbModel: 'Users',
                method: 'findById',
                object: req.params.id
            }, (data) => {
                if (data) {
                    res.send(new UserReturnModel(data))
                } else {
                    res.send({
                        isSuccess: false,
                        errors: [{
                            message: 'user.noexist'
                        }]
                    })
                }
                next();
            });

        });

        // check if user isAuthorize
        super.addAction({
            path: '/users/authorize',
            method: 'GET',
            name: 'user_authorize_ignore'
        }, (req, res, next) => {
            jwt.verify(req.headers['x-access-token'], lib.config.secretKey, (err, decoded) => {
                if (!err && decoded && decoded.data.isAuthorize) {
                    super.excuteDb(res, next, {
                        dbModel: 'Users',
                        method: 'findById',
                        object: decoded.data.loggedUserId
                    }, (data) => {
                        var user = new UserReturnModel(data);
                        res.send({
                            isSuccess: user.isSuccess,
                            data: {
                                isAuthorize: true,
                                loggedUser: user.data
                            }
                        })
                        next();
                    });
                } else {
                    res.send({
                        isSuccess: true,
                        data: {
                            isAuthorize: false,
                            loggedUser: {}
                        }
                    })
                }
            })

        })

        //Register a new user
        super.addAction({
            path: '/users',
            method: 'POST',
            name: 'user_register_ignore',
        }, (req, res, next) => {
            super.excuteDb(res, next, {
                dbModel: 'Users',
                method: 'create',
                object: req.params
            }, (data) => {
                var user = new UserReturnModel(data);
                var token = jwt.sign({
                    data: {
                        isAuthorize: true,
                        loggedUserId: user.data.uuid
                    }
                }, lib.config.secretKey, lib.config.expiresIn);

                res.send({
                    isSuccess: true,
                    data: {
                        user: user.data,
                        token: token
                    }

                })
                next();
            });
        })

        //user login
        super.addAction({
            path: '/users/mobile',
            method: 'GET',
            name: 'user_login_ignore',
        }, (req, res, next) => {
            super.excuteDb(res, next, {
                dbModel: 'Users',
                method: 'findOne',
                object: {
                    where: {
                        mobile: req.params.mobile,
                        password: req.params.password
                    },
                    attributes: {
                        exclude: ['password']
                    }
                }
            }, (data) => {
                if (data) {
                    var user = new UserReturnModel(data);
                    var token = jwt.sign({
                        data: {
                            isAuthorize: true,
                            loggedUserId: user.data.uuid
                        }
                    }, lib.config.secretKey, lib.config.expiresIn)

                    res.send({
                        isSuccess: true,
                        data: {
                            user: user.data,
                            token: token
                        }
                    })
                } else {
                    res.send({
                        isSuccess: false,
                        errors: [{
                            message: 'user.noexist'
                        }]
                    })
                }
                next();
            });
        })

        // Update user profile
        super.addAction({
            path: '/users/editprofile',
            method: 'PUT'
        }, (req, res, next) => {
            super.excuteDb(res, next, {
                dbModel: 'Users',
                method: 'update',
                object: req.params,
                options: {
                    where: {
                        uuid: req.params.uuid
                    },
                    fields: ['nickName', 'goingOn', 'birthday', 'school', 'work', 'wechat']
                }
            }, (data) => {
                res.send({
                    isSuccess: true
                });
                next();
            });
        })
    }
}

module.exports = UserController