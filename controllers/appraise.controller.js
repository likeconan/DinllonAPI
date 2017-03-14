var BaseCtrl = require('./base.controller');
var fs = require('fs');

class AppraiseController extends BaseCtrl {
    constructor(db) {
        super(db);
        this.initalAction(db);
    }
    initalAction(db) {

        //Get all my good appraise
        super.addAction({
            path: '/appraises/:userId',
            method: 'GET'
        }, (req, res, next) => {
            super.excuteDb(res, next, {
                dbModel: 'Appraises',
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
                            model: db.Users,
                            attributes: {
                                exclude: ['password', 'wechat', 'mobile']
                            }
                        }
                    ]
                }
            }, (data) => {
                res.send({isSuccess: true, data: data})
                next();
            });

        });

        //Appraise some one
        super.addAction({
            path: '/appraises',
            method: 'POST'
        }, (req, res, next) => {
            super.excuteDb(res, next, {
                dbModel: 'Appraises',
                method: 'create',
                object: req.params
            }, (data) => {
                res.send({isSuccess: true, data: data});
            });
        });

        //update my appraise
        super.addAction({
            path: '/appraises',
            method: 'PUT'
        }, (req, res, next) => {
            super.excuteDb(res, next, {
                dbModel: 'Appraises',
                method: 'update',
                object: req.params,
                options: {
                    where: {
                        uuid: req.params.uuid
                    }
                }
            }, (data) => {
                res.send({isSuccess: true, data: data});
            });
        });

    }
}

module.exports = AppraiseController