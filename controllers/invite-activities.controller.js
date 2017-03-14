var BaseCtrl = require('./base.controller');
var fs = require('fs');

class InviteActivityController extends BaseCtrl {
    constructor(db) {
        super(db);
        this.initalAction(db);
    }
    initalAction(db) {

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
                    include: [{
                        model: db.Users,
                        attributes: {
                            exclude: ['password']
                        },
                    }]
                }
            }, (data) => {
                res.send({ isSuccess: true, data: data })
                next();
            });

        });

        //invite a activity
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

        //invite a activity
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