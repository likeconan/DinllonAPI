var BaseCtrl = require('./base.controller');
var UserReturnModel = require('../returnmodels').UserReturnModel;

class UserController extends BaseCtrl {
    constructor(db) {
        super(db);
        this.initalAction();

    }
    initalAction() {

        //Get users
        super.addAction({
            path: '/users',
            method: 'GET'
        }, (req, res, next) => {
            super.excuteDb(res, next, {
                dbModel: 'Users',
                method: 'findAll',
                object: {
                    attributes: {
                        exclude: ['password']
                    },
                    where: {
                        isDeleted: false
                    },
                    order: [
                        ['createdAt', 'DESC']
                    ]
                }
            }, (data) => {
                res.send({ isSuccess: true, data: data });
                next();
            });

        });

        //Get user by id
        super.addAction({
            path: '/users/:id',
            method: 'GET'
        }, (req, res, next) => {
            super.excuteDb(res, next, {
                dbModel: 'Users',
                method: 'findById',
                object: req.params.id
            }, (data) => {
                res.send(new UserReturnModel(data))
                next();
            });

        });

        //Register a new user
        super.addAction({
            path: '/users',
            method: 'POST'
        }, (req, res, next) => {
            super.excuteDb(res, next, {
                dbModel: 'Users',
                method: 'create',
                object: req.params
            }, (data) => {
                res.send(new UserReturnModel(data));
                next();
            });
        })

        // Update user profile
        super.addAction({
            path: '/users',
            method: 'PUT'
        }, (req, res, next) => {
            super.excuteDb(res, next, {
                dbModel: 'Users',
                method: 'create',
                object: req.params
            }, (data) => {
                res.send(new UserReturnModel(data));
                next();
            });
        })
    }
}

module.exports = UserController