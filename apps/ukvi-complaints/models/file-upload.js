'use strict'
/* eslint-disable */
const url = require('url');
const { model: Model } = require('hof');
const uuid = require('uuid').v4
const { Jimp } = require('jimp');
const fs = require('fs');
const noPreview = 'data:image/png;base64,' + fs.readFileSync('assets/images/no-preview.png', { encoding: 'base64' });
const config = require('../../../config');
const FormData = require('form-data');
const logger = require('hof/lib/logger')({ env: config.env })

module.exports = class UploadModel extends Model {
    constructor(...args) {
        super(...args);
        this.set('id', uuid());
    }
    async save() {
        try {
            const attributes = {
                url: config.upload.hostname
            };
            const reqConf = url.parse(this.url(attributes));  //TODO url.parse is deprecated.  replace with new URL(......)
            // const reqConf = new URL(this.url(attributes));
            const formData = new FormData();
            formData.append('document', this.get('data'), {
                filename: this.get('name'),
                contentType: this.get('mimetype')
            });
            reqConf.data = formData;
            reqConf.method = 'POST';
            reqConf.headers = {
                ...formData.getHeaders()
            };
            const result = await new Promise((resolve, reject) => {
                this.request(reqConf, (err, data) => {
                    if (err) {
                        return reject(err);
                    }
                    return resolve(data);
                });
            });
            logger.info(`Successfully saved data`);
            await this.set({ url: result.url });
            await this.thumbnail();
            this.unset('data');
        } catch (err) {
            logger.error('Error in save method ', err)
            throw err;
        }
    }

    async thumbnail() {
        try {
            const image = await Jimp.read(this.get('data'));
            image.resize({ w: 300 })
            const thumbnail = await image.getBase64(this.get('mimetype'));
            this.set('thumbnail', thumbnail);
        } catch (error) {
            this.set('thumbnail', noPreview);
            logger.error('Error in thumbnail:  ', error)
        }
    }

    async auth() {
        try {
            if (!config.keycloak.token) {
                logger.error('keycloak token url is not defined');
                return Promise.resolve({
                    bearer: 'abc123'
                });
            }
            const tokenReq = {
                url: config.keycloak.token,
                headers: { 'content-type': 'application/x-www-form-urlencoded' },
                data: {
                    username: config.keycloak.username,
                    password: config.keycloak.password,
                    grant_type: 'password',
                    client_id: config.keycloak.clientId,
                    client_secret: config.keycloak.secret
                },
                method: 'POST'
            };
            const response = await this._request(tokenReq);
            return { bearer: response.data.access_token };
        } catch (err) {
            const body = err.response.data
            logger.error(`Error in auth method: ${body.error} - ${body.error_description}`);
            throw err || new Error(`${body.error} - ${body.error_description}`);
        }
    }
};
