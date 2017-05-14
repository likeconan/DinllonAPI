var BaseCtrl = require('./base.controller');
var UserReturnModel = require('../returnmodels').UserReturnModel;
var jwt = require('jsonwebtoken');
var path = require('path');

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
                    var user = new UserReturnModel(data);
                    res.send({
                        isSuccess: user.isSuccess,
                        data: {
                            user: user.data,
                            isOwn: req.decoded && req.decoded.data.loggedUserId === req.params.id,
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

        });

        // check if user isAuthorize
        super.addAction({
            path: '/users/authorize',
            method: 'GET',
            name: 'user_authorize_ignore'
        }, (req, res, next) => {
            if (req.decoded.data.isAuthorize) {
                super.excuteDb(res, next, {
                    dbModel: 'Users',
                    method: 'findById',
                    object: req.decoded.data.loggedUserId
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

        // Update user profile image
        super.addAction({
            path: '/users/editprofile/image',
            method: 'PUT'
        }, (req, res, next) => {
            var file = req.files.file;
            var url = '/original/' + path.basename(file.path)
            var obj = req.params.prop === "backPic" ?
                {
                    backPic: url
                } :
                {
                    headPic: url
                }
            super.excuteDb(res, next, {
                dbModel: 'Users',
                method: 'update',
                object: obj,
                options: {
                    where: {
                        uuid: req.params.uuid
                    },
                    fields: [req.params.prop]
                }
            }, (data) => {
                res.send({
                    isSuccess: true,
                    data: url
                });
                next();
            });
        })

        //get user's data count
        super.addAction({
            path: '/users/data/:userId',
            name: 'get_user_data_ignore',
            method: 'GET'
        }, (req, res, next) => {
            var id = req.params.userId ? req.params.userId : req.decoded.data.loggedUserId;
            if (id) {
                lib.db.sequelize.query(lib.queries.getCount, {
                    replacements: { id: id },
                    type: lib.db.sequelize.QueryTypes.SELECT
                }).then(function (data) {
                    res.send({
                        isSuccess: true,
                        data: data[0]
                    });
                    next();
                }, function (err) {
                    res.send({
                        isSuccess: false,
                        errors: [{
                            message: 'unknow_error'
                        }]
                    })
                });
            } else {
                res.send({
                    isSuccess: true,
                    data: {}
                })
            }

        })
    }
}

module.exports = UserController