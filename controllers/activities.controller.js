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
                        attributes: ['status'],
                        where: {
                            userId: req.decoded.data.loggedUserId
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
                        isDeleted: false,
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

    }
}

module.exports = ActivityController