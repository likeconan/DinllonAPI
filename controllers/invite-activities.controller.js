var BaseCtrl = require('./base.controller');
var fs = require('fs');

class InviteActivityController extends BaseCtrl {
    constructor(lib) {
        super(lib);
        this.initalAction(lib);
    }
    initalAction(lib) {

        //Get my invited activities
        super.addAction({
            path: '/activities/invite/:userId',
            method: 'GET'
        }, (req, res, next) => {
            super.excuteDb(res, next, {
                dbModel: 'InviteActivities',
                method: 'findAll',
                object: {
                    limit: 10,
                    offset: req.params.offset,
                    where: {
                        userId: req.params.userId,
                        isDeleted: false
                    },
                    order: [
                        ['createdAt', 'DESC']
                    ],
                    include: [
                        {
                            model: lib.db.Users,
                            attributes: {
                                exclude: ['password', 'wechat', 'mobile']
                            }
                        }
                    ]
                }
            }, (data) => {
                res.send({ isSuccess: true, data: data })
                next();
            });

        });

        //Get my inviting
        super.addAction({
            path: '/activities/invite/by/:userId',
            method: 'GET'
        }, (req, res, next) => {
            super.excuteDb(res, next, {
                dbModel: 'InviteActivities',
                method: 'findAll',
                object: {
                    limit: 10,
                    offset: req.params.offset,
                    where: {
                        invitedBy: req.params.userId,
                        isDeleted: false
                    },
                    order: [
                        ['createdAt', 'DESC']
                    ],
                    include: [
                        {
                            model: lib.db.Users,
                            attributes: {
                                exclude: ['password', 'wechat', 'mobile']
                            }
                        }
                    ]
                }
            }, (data) => {
                res.send({ isSuccess: true, data: data })
                next();
            });

        });

        //invite to a activity
        super.addAction({
            path: '/activities/invite',
            method: 'POST'
        }, (req, res, next) => {
            super.excuteDb(res, next, {
                dbModel: 'InviteActivities',
                method: 'create',
                object: req.params
            }, (data) => {
                res.send({ isSuccess: true, data: data });
            });
        });

        //accept invited data
        super.addAction({
            path: '/activities/invite',
            method: 'PUT'
        }, (req, res, next) => {
            super.excuteDb(res, next, {
                dbModel: 'InviteActivities',
                method: 'update',
                object: req.params,
                options: {
                    where: {
                        uuid: req.params.uuid
                    }
                }
            }, (data) => {
                res.send({ isSuccess: true, data: data });
            });
        });
    }
}

module.exports = InviteActivityController