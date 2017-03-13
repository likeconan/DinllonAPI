var BaseCtrl = require('./base.controller');
var fs = require('fs');

class ActivityController extends BaseCtrl {
    constructor(db) {
        super(db);
        this.initalAction(db);
    }
    initalAction(db) {

        //Get moments
        super.addAction({
            path: '/activities',
            method: 'GET'
        }, (req, res, next) => {
            super.excuteDb(res, next, {
                dbModel: 'Activities',
                method: 'findAll',
                object: {
                    limit: 1,
                    offset: req.params.offset,
                    where: {
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
                    }, {
                        model: db.Images,
                        attributes: ['url']
                    }]
                }
            }, (data) => {
                res.send({ isSuccess: true, data: data })
                next();
            });

        });

        //Create a moment
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