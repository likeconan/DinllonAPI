class BaseController {
    constructor(db) {
        this.actions = [];
        this.server = null;
        this.db = db;
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

    excuteDb(res, next, spec, action) {
        try {
            this
                .db[spec.dbModel][spec.method](spec.object)
                .then((data) => {
                    try {
                        action(data);
                    } catch (error) {
                        res.send(500, error);
                    }
                })
                .catch((err) => {
                    try {
                        var errors = err.errors && err.errors.length > 0
                            ? err.errors
                            : [
                                {
                                    name: err.name,
                                    message: err.original.constraint + "." + err.original.code
                                }
                            ];
                        res.send({isSuccess: false, errors: errors});
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

    }

}

module.exports = BaseController;