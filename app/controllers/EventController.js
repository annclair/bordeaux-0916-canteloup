'use strict'
let fs = require('fs')
let formidable = require('formidable')
let Controller = require('./Controller')
const EVENT = require('../models/event')

class EventContoller extends Controller {

    constructor() {
        super(EVENT)
    }

    findPublished(req, res, next) {
        if (req.query.limit && isNaN(Number(req.query.limit))) {
            next("Limit must be a number")
        } else {
            EVENT.find({
                isDraft: false
            }).sort({
                createdAt: "desc"
            }).limit(Number(req.query.limit) || 0 ).exec((err, objects) => {
                if (err)
                    next(err)
                else
                    res.json(objects)
            })
        }
    }

    upload(req, res, next) {
        let form = new formidable.IncomingForm()

        form.uploadDir = './public/img/events/'

        if (!fs.existsSync(form.uploadDir)) fs.mkdirSync(form.uploadDir);

        form
            .on('file', (field, file) => {
                if (!fs.existsSync(form.uploadDir + field)) fs.mkdirSync(form.uploadDir + field);
                fs.rename(file.path, form.uploadDir + file.name)
                this.model.findById(req.params.id).exec((err, event) => {
                    if (err) {
                        next(err)
                    } else {
                        event[field] = "/img/events/" + file.name
                        event.save()
                    }
                })
            })
            .on('end', () => {
                console.log('-> upload done')
                res.sendStatus(200)
            });
        form.parse(req);
    }

}

module.exports = EventContoller
