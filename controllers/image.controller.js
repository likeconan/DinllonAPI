var BaseCtrl = require('./base.controller');
var path = require('path');
class ImageController extends BaseCtrl {
    constructor(lib) {
        super(lib);
        this.initalAction();
    }
    initalAction() {

        //Create a image
        super.addAction({
            name: 'create_image',
            path: '/images',
            method: 'POST'
        }, (req, res, next) => {
            var images = [];
            for (var key in req.files) {
                var file = req.files[key];
                var url = '/original/' + path.basename(file.path)
                images.push({
                    url: url,
                    path: file.path,
                    imageType: 'original',
                    from: req.fromType,
                    relatedId: req.relatedId,
                });
            }
            if (images.length > 0) {
                super.excuteDb(res, next, {
                    dbModel: 'Images',
                    method: 'bulkCreate',
                    object: images
                });
            }
            req.resData.dataValues.images = images.map((img) => { return img.url });
            res.send({ isSuccess: true, data: req.resData });
            next();

        });

    }
}

module.exports = ImageController