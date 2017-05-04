var BaseCtrl = require('./base.controller');
var fs = require('fs');

class JoinActivityController extends BaseCtrl {
    constructor(lib) {
        super(lib);
        this.initalAction(lib);
    }
    initalAction(lib) {

        //Get joined activity users
        super.addAction({
            path: '/activities/join/:activityId',
            method: 'GET'
        }, (req, res, next) => {
            super.excuteDb(res, next, {
                dbModel: 'JoinActivities',
                method: 'findAll',
                object: {
                    limit: 10,
                    offset: req.params.offset,
                    where: {
                        activityId: req.params.activityId,
                        isDeleted: false
                    },
                    order: [
                        ['createdAt', 'DESC']
                    ],
                    include: [{
                        model: lib.db.Users,
                        attributes: {
                            exclude: ['password', 'mobile', 'wechat']
                        }
                    }]
                }
            }, (data) => {
                res.send({
                    isSuccess: true,
                    data: data
                })
                next();
            });

        });

        //Get user's joined activities
        super.addAction({
            path: '/activities/join/user/:userId',
            method: 'GET'
        }, (req, res, next) => {
            super.excuteDb(res, next, {
                dbModel: 'JoinActivities',
                method: 'findAll',
                object: {
                    where: {
                        userId: req.params.userId,
                    },
                    include: {
                        model: lib.db.Activities,
                        where: {
                            isAuthorize: true,
                            startedAt: {
                                $gt: new Date()
                            }
                        }
                    }

                }
            }, (data) => {
                res.send({
                    isSuccess: true,
                    data: data
                })
                next();
            });

        });

        //Get user's joined available activities
        super.addAction({
            path: '/activities/join/available/:userId',
            method: 'GET'
        }, (req, res, next) => {
            super.excuteDb(res, next, {
                dbModel: 'JoinActivities',
                method: 'findAll',
                object: {
                    attributes: ['userId', 'uuid'],
                    where: {
                        userId: req.params.userId,
                    },
                    include: {
                        model: lib.db.Activities,
                        where: {
                            isAuthorize: true,
                            startedAt: {
                                $gt: new Date()
                            }
                        },
                        include: {
                            model: lib.db.Images,
                            attributes: ['url']
                        }
                    }

                }
            }, (data) => {
                res.send({
                    isSuccess: true,
                    data: data
                })
                next();
            });

        });

        //Join a activity
        super.addAction({
            path: '/activities/join',
            method: 'POST'
        }, (req, res, next) => {
            super.excuteDb(res, next, {
                dbModel: 'JoinActivities',
                method: 'create',
                object: req.params
            }, (data) => {
                res.send({
                    isSuccess: true,
                    data: data
                });
            });
        });

        //Edit joined people
        super.addAction({
            path: '/activities/join/:uuid',
            method: 'PUT'
        }, (req, res, next) => {
            super.excuteDb(res, next, {
                dbModel: 'JoinActivities',
                method: 'update',
                object: { status: 2 },
                options: {
                    where: {
                        uuid: req.params.uuid
                    }
                }
            }, (data) => {
                res.send({
                    isSuccess: true,
                    data: data
                });
            });
        });

        //cancel apply joined
        super.addAction({
            path: '/activities/join/:uuid',
            method: 'DEL'
        }, (req, res, next) => {
            super.excuteDb(res, next, {
                dbModel: 'JoinActivities',
                method: 'destroy',
                object: {
                    where: {
                        uuid: req.params.uuid
                    },
                    force: true
                }
            }, (data) => {
                res.send(data > 0 ?
                    {
                        isSuccess: true
                    } :
                    {
                        isSuccess: false,
                        errors: [{
                            name: 'no_delete',
                            message: 'cancel_apply_deleted_faild'
                        }]
                    });
            });
        });

    }
}

module.exports = JoinActivityController