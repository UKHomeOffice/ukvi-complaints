'use strict';
const _ = require('lodash');
// const lodash_get = require('lodash.get');
// const lodash_pick = require('lodash.pick');
const config = require('../../../config');
const Model = require('../models/file-upload');
const fileSizeNum = size => size.match(/\d+/g)[0]; // regular expression pulling the digits out of the maxFileSize from config.js

module.exports = name => superclass => class extends superclass {
    process(req) {
        if (req.files && req.files[name]) {
            //set file name on values for file name extension validation
            // NB:  validation controller gets values from req.form.values and not on req.files
            req.form.values[name] = req.files[name].name;
            req.log('info', `Processing file: ${req.form.values[name]}`);
        }
        super.process.apply(this, arguments);
    }

    locals(req, res, next) {
        const maxNum = fileSizeNum(config.upload.maxFileSize);
        const maxSize = config.upload.maxFileSize.match(/[a-zA-Z]+/g)[0].toUpperCase();

        return Object.assign({}, super.locals(req, res, next), {
            maxFileSize: `${maxNum} ${maxSize}`
        });
    }

    validateField(key, req) {
        if (req.body['upload-file']) {
            const fileUpload = _.get(req.files, `${name}`);
            if (fileUpload) {
                const uploadSize = fileUpload.size;
                const mimetype = fileUpload.mimetype
                const uploadSizeTooBig = uploadSize > (fileSizeNum(config.upload.maxFileSize) * 1000000);
                const uploadSizeBeyondServerLimits = uploadSize === null;
                const invalidMimetype = !config.upload.allowedMimeTypes.includes(mimetype)
                const invalidSize = uploadSizeTooBig || uploadSizeBeyondServerLimits;

                if (invalidSize || invalidMimetype) {
                    return new this.ValidationError('file', {
                        type: invalidSize ? 'maxFileSize' : 'fileType',
                        redirect: undefined
                    });
                }
            } else {
                return new this.ValidationError('file', {
                    type: 'required',
                    redirect: undefined
                });
            }
        }

        // else if (!req.sessionModel.get('files') === undefined){
        //     // req.sessionModel.set('files', []);
        //     req.log('info', `no file selected`);
        // } 
        // else if (req.sessionModel.get('files').length === 0) {
        //     return new this.ValidationError('file', {
        //         type: 'required',
        //         redirect: undefined
        //     });
        // }
        return super.validateField(key, req);
    }
    saveValues(req, res, next) {
        const files = req.sessionModel.get('files') || [];
        if (req.body['upload-file']) {
            if (req.files && req.files[name]) {
                req.log('info', `Reference: ${req.sessionModel.get('reference')}, Saving file: ${req.files[name].name}`);
                const file = _.pick(req.files[name], ['name', 'data', 'mimetype']);
                const model = new Model(file);
                return model.save()
                    .then(() => {
                        if (req.files && req.files[name]) { req.sessionModel.set('files', [...files, model.toJSON()]) }; // if uploading a new file, replace the file that has already been uploaded
                        // if (req.form.options.route === '/reason') {res.redirect('/reason')};                   // stay on page after uploading; don't advance to next page
                        if (req.form.options.route === '/complaint-details') { res.redirect('/complaint-details') };         // stay on page after uploading; don't advance to next pag
                        return super.saveValues(req, res, next);
                    })
                    .catch(next);
            }
        }
        return super.saveValues.apply(this, arguments);
    }
};
