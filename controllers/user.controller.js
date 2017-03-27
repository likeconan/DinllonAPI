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
            var token = req.headers['x-access-token'];
            if (token) {
                jwt
                    .verify(token, lib.config.secretKey, function (err, decoded) {
                        res.send({
                            isSuccess: true,
                            data: !err && decoded && decoded.data.isAuthorize ? decoded.data : {
                                isAuthorize: false,
                                loggedUser: {}
                            }
                        });
                    })
            } else {
                res.send({
                    isSuccess: true,
                    data: {
                        isAuthorize: false,
                        loggedUser: {}
                    }
                });
            }

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
                        loggedUser: user.data
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
                            loggedUser: user.data
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
            path: '/users',
            method: 'PUT'
        }, (req, res, next) => {
            super.excuteDb(res, next, {
                dbModel: 'Users',
                method: 'create',
                object: req.params
            }, (data) => {
                res.send(new UserReturnModel(data));
                next();
            });
        })
    }
}

module.exports = UserController