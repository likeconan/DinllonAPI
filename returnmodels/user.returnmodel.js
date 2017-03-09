class UserReturnModel {
    constructor(data) {
        this.isSuccess = true;
        data = Object.assign({}, data);
        delete data.dataValues['password'];
        this.data = data.dataValues;
    }
}

module.exports = UserReturnModel;