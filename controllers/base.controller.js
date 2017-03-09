class BaseController {
    constructor(lib) {
        this.actions = [];
        this.server = null;
        this.db = lib.db;
        this.rm = lib.returnModel;
    }

    setUpActions(app) {
        this.server = app;
        for (let act of this.actions) {
            var method = act['spec']['method'];
            app[method.toLowerCase()](act['spec']['path'], act['action']);
        }
    }
    addAction(spec, fn) {
        var newAct = {
            'spec': spec,
            action: fn
        }
        this
            .actions
            .push(newAct)
    }

    excuteDb(spec, res, next) {
        return new Promise((resolve, reject) => {
            try {
                this
                    .db[spec.dbModel][spec.method](spec.object)
                    .then((obj) => {
                        resolve(obj);
                    })
                    .catch((err) => {
                        try {
                            var errors = err.errors && err.errors.length > 0
                                ? err
                                : [
                                    {
                                        name: err.name,
                                        message: err.original.constraint + "." + err.original.code
                                    }
                                ];

                            res.send(new this.rm.BaseReturnModel(null, errors));
                            next();
                        } catch (error) {
                            res.send(500, error);
                            next();
                        }

                    })
            } catch (error) {
                res.send(500, error);
                next();
            }

        })

    }

}

module.exports = BaseController;