var BaseCtrl = require('./base.controller');

class UserController extends BaseCtrl {
    constructor(lib) {
        super(lib);
        this.initalAction();

    }
    initalAction() {
        super.addAction({
            path: '/users',
            method: 'GET'
        }, (req, res, next) => {
            super.excuteDb({
                dbModel: 'Users',
                method: 'create'
            }, res, next).then((obj) => {
                res.send(new this.rm.BaseReturnModel(obj))
                next();
            })

        });

        super.addAction({
            path: '/users',
            method: 'POST'
        }, (req, res, next) => {
            super.excuteDb({
                dbModel: 'Users',
                method: 'create',
                object: req.params
            }, res, next).then((obj) => {
                var model = super.rm.UserReturnModel;
                var test = new model(obj);
                var data = new super
                    .rm
                    .UserReturnModel(obj)
                res.send(new super.rm.UserReturnModel(obj));
                next();
            })
        })
    }
}

module.exports = UserController