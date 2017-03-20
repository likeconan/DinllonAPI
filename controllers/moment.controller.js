var BaseCtrl = require('./base.controller');
var fs = require('fs');

class MomentController extends BaseCtrl {
    constructor(lib) {
        super(lib);
        this.initalAction(lib);

    }
    initalAction(lib) {

        //Get moments
        super.addAction({
            path: '/moments',
            method: 'GET'
        }, (req, res, next) => {
            super.excuteDb(res, next, {
                dbModel: 'Moments',
                method: 'findAll',
                object: {
                    limit: 10,
                    offset: req.params.offset,
                    where: {
                        isDeleted: false
                    },
                    order: [
                        ['createdAt', 'DESC']
                    ],
                    include: [{
                        model: lib.db.Users,
                        attributes: {
                            exclude: ['password']
                        },
                    }, {
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

        //Create a moment
        super.addAction({
            path: '/moments',
            method: 'POST'
        }, (req, res, next) => {
            super.excuteDb(res, next, {
                dbModel: 'Moments',
                method: 'create',
                object: req.params
            }, (data) => {
                req.relatedId = data.dataValues.uuid;
                req.fromType = 'moment';
                req.resData = data;
                next('create_image');
            });
        });

    }
}

module.exports = MomentController