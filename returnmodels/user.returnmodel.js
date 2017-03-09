var BaseReturnModel = require('./base.returnmodel');

class UserReturnModel extends BaseReturnModel {
    constructor(data, errors) {
        data = Object.assign({}, data);
        delete data['password']
        super(data, errors);

    }
}