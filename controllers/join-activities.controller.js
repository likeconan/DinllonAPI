var BaseCtrl = require('./base.controller');
var fs = require('fs');

class JoinActivityController extends BaseCtrl {
    constructor(db) {
        super(db);
        this.initalAction(db);
    }
    initalAction(db) {

        //Get joined activities
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
                res.send({ isSuccess: true, data: data });
            });
        });

        //Join a activity
        super.addAction({
            path: '/activities/join',
            method: 'PUT'
        }, (req, res, next) => {
            super.excuteDb(res, next, {
                dbModel: 'JoinActivities',
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

module.exports = JoinActivityController