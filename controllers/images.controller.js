var BaseCtrl = require('./base.controller');

class ImagesController extends BaseCtrl {
    constructor(lib) {
        super(lib);
        this.initalAction();

    }
    initalAction() {

        //Get moments
        super.addAction({
            path: '/moments',
            method: 'GET'
        }, (req, res, next) => {
            super.excuteDb(res, next, {
                dbModel: 'Moments',
                method: 'findAll',
                object: {
                    where: {
                        isDeleted: false
                    },
                    order: [
                        ['createdAt', 'DESC']
                    ]
                }
            }, (data) => {

                res.send()
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

                res.send()
                next();
            });

        });

    }
}

module.exports = ImagesController