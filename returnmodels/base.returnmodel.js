class BaseReturnModel {
    constructor(data, errors) {
        this.isSuccess = errors && errors.length > 0
            ? false
            : true;
        this.errors = errors;
        this.data = data;
    }
}

module.exports = BaseReturnModel;