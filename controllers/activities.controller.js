var BaseCtrl = require('./base.controller');
var fs = require('fs');

class ActivityController extends BaseCtrl {
    constructor(lib) {
        super(lib);
        this.initalAction(lib);
    }
    initalAction(lib) {

        //Get activities
        super.addAction({
            path: '/activities',
            name: 'search_activity_ignore',
            method: 'GET'
        }, (req, res, next) => {
            super.excuteDb(res, next, {
                dbModel: 'Activities',
                method: 'findAll',
                object: {
                    limit: 1,
                    offset: req.params.offset,
                    where: {
                        isDeleted: false,
                        isAuthorize: true
                    },
                    order: [
                        ['createdAt', 'DESC']
                    ],
                    include: [{
                        model: lib.db.Users,
                        attributes: {
                            exclude: ['password', 'mobile', 'wechat']
                        }
                    }, {
                        model: lib.db.Images,
                        attributes: ['url']
                    }, {
                        model: lib.db.JoinActivities,
                        required: false,
                        attributes: ['status', 'uuid'],
                        where: {
                            userId: req.decoded ? req.decoded.data.loggedUserId : undefined
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

        //get user available activities
        super.addAction({
            path: '/activities/available/:userId',
            method: 'GET'
        }, (req, res, next) => {
            super.excuteDb(res, next, {
                dbModel: 'Activities',
                method: 'findAll',
                object: {
                    where: {
                        userId: req.params.userId,
                        isAuthorize: true,
                        startedAt: {
                            $gt: new Date()
                        }
                    },
                    order: [
                        ['createdAt', 'DESC']
                    ],
                    include: [{
                        model: lib.db.Images,
                        attributes: ['url']
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

        //get user's activity

        super.addAction({
            path: '/activities/:userId',
            name: 'getuser_activity_ignore',
            method: 'GET'
        }, (req, res, next) => {

            super.excuteDb(res, next, {
                dbModel: 'Activities',
                method: 'findAll',
                object: {
                    limit: 10,
                    offset: req.params.offset,
                    where: {
                        userId: req.params.userId,
                        isAuthorize: true
                    },
                    order: [
                        ['createdAt', 'DESC']
                    ],
                    include: [{
                        model: lib.db.Images,
                        attributes: ['url']
                    }, {
                        model: lib.db.JoinActivities,
                        attributes: ['userId', 'uuid', 'status'],
                        include: [{
                            model: lib.db.Users,
                            attributes: ['uuid', 'headPic', 'nickName']
                        }]
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

        super.addAction({
            path: '/activities/one/:activityId',
            name: 'get_activity_one_ignore',
            method: 'GET'
        }, (req, res, next) => {

            super.excuteDb(res, next, {
                dbModel: 'Activities',
                method: 'findOne',
                object: {
                    where: {
                        uuid: req.params.activityId
                    },
                    include: [{
                        model: lib.db.Images,
                        attributes: ['url']
                    }, {
                        model: lib.db.JoinActivities,
                        attributes: ['userId', 'uuid', 'status'],
                        include: [{
                            model: lib.db.Users,
                            attributes: ['uuid', 'headPic', 'nickName']
                        }]
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

        //Create a activity
        super.addAction({
            path: '/activities',
            method: 'POST'
        }, (req, res, next) => {
            super.excuteDb(res, next, {
                dbModel: 'Activities',
                method: 'create',
                object: req.params
            }, (data) => {
                req.relatedId = data.dataValues.uuid;
                req.fromType = 'activity';
                req.resData = data;
                next('create_image');
            });
        });

        //delete activity
        super.addAction({
            path: '/activities/:uuid',
            method: 'DEL'
        }, (req, res, next) => {
            super.excuteDb(res, next, {
                dbModel: 'Activities',
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
                            message: 'activity_deleted_faild'
                        }]
                    });
            });
        });


    }
}

module.exports = ActivityController