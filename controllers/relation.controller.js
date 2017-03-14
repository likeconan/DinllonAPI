var BaseCtrl = require('./base.controller');
var fs = require('fs');

class RelationController extends BaseCtrl {
    constructor(db) {
        super(db);
        this.initalAction(db);
    }
    initalAction(db) {

        //Get all my friends
        super.addAction({
            path: '/relations/:userId',
            method: 'GET'
        }, (req, res, next) => {
            super.excuteDb(res, next, {
                dbModel: 'relations',
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

        //ask for relation
        super.addAction({
            path: '/relations',
            method: 'POST'
        }, (req, res, next) => {
            super.excuteDb(res, next, {
                dbModel: 'Relations',
                method: 'upsert',
                object: req.params
            }, (data) => {
                res.send({isSuccess: true, data: data});
            });
        });

        

    }
}

module.exports = RelationController