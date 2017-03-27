class BaseController {
    constructor(lib) {
        this.actions = [];
        this.server = null;
        this.db = lib.db;
    }

    setUpActions(app) {
        this.server = app;
        for (let act of this.actions) {
            var method = act['spec']['method'];
            app[method.toLowerCase()]({
                name: act['spec']['name'],
                path: act['spec']['path']
            }, act['action']);
        }
    }
    addAction(spec, fn) {
        var newAct = {
            'spec': spec,
            action: fn,
        }
        this
            .actions
            .push(newAct)
    }

    excuteDb(res, next, spec, action) {
        try {
            var process = spec.options ?
                this
                .db[spec.dbModel][spec.method](spec.object, spec.options) :
                this
                .db[spec.dbModel][spec.method](spec.object);

            process.then((data) => {
                    try {
                        if (action) {
                            action(data);
                        }
                    } catch (error) {
                        res.send(500, error);
                    }
                })
                .catch((err) => {
                    try {
                        var errors = err.errors && err.errors.length > 0 ?
                            err.errors : [{
                                name: err.name,
                                message: err.name === 'SequelizeUniqueConstraintError' ? err.original.constraint + '_' + err.original.code : err.message
                            }];
                        res.send({
                            isSuccess: false,
                            errors: errors
                        });
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