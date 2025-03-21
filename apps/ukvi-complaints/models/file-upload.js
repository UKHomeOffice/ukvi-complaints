/* eslint-disable node/no-deprecated-api */
'use strict';

const url = require('url');
const Model = require('hof').model;
const uuid = require('uuid').v4;
const FormData = require('form-data');

const config = require('../../../config');
const logger = require('hof/lib/logger')({ env: config.env });

module.exports = class UploadModel extends Model {
  constructor(...args) {
    super(...args);
    this.set('id', uuid());
  }

  save() {
    if (!config.upload.hostname) {
      const errorMsg = 'File-vault hostname is not defined';
      logger.error(errorMsg);
      throw new Error(errorMsg);
    }

    const attributes = {
      url: config.upload.hostname
    };

    const formData = new FormData();
    formData.append('document', this.get('data'), {
      filename: this.get('name'),
      contentType: this.get('mimetype')
    });

    const reqConf = url.parse(this.url(attributes));
    reqConf.data = formData;
    reqConf.method = 'POST';
    reqConf.headers = {
      ...formData.getHeaders()
    };

    return new Promise((resolve, reject) => {
      return this.request(reqConf, (err, data) => {
        if (err) {
          logger.error(`File upload failed: ${err.message},
            error: ${JSON.stringify(err)}`);
          return reject(new Error(`File upload failed: ${err.message}`));
        }

        if (
          !data ||
          typeof data !== 'object' ||
          Object.keys(data).length === 0
        ) {
          const errorMsg = 'Received empty or invalid response from file-vault';
          logger.error(errorMsg);
          return reject(new Error(errorMsg));
        }

        logger.info(
          `Received response from file-vault with keys: ${Object.keys(data)}`
        );
        return resolve(data);
      });
    })
      .then(result => {
        try {
          this.set({
            url: result.url
              .replace('/file/', '/file/generate-link/')
              .split('?')[0]
          });
        } catch (err) {
          const errorMsg = `No url in response: ${err.message}`;
          logger.error(errorMsg);
          throw new Error(errorMsg);
        }
      })
      .then(() => {
        this.unset('data');
      });
  }

  async auth() {
    const requiredProperties = [
      'token',
      'username',
      'password',
      'clientId',
      'secret'
    ];

    for (const property of requiredProperties) {
      if (!config.keycloak[property]) {
        const errorMsg = `Keycloak ${property} is not defined`;
        logger.error(errorMsg);
        throw new Error(errorMsg);
      }
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

    try {
      const response = await this._request(tokenReq);

      if (!response.data || !response.data.access_token) {
        const errorMsg = 'No access token in response';
        logger.error(errorMsg);
        throw new Error(errorMsg);
      }

      logger.info('Successfully retrieved access token');
      return {
        bearer: response.data.access_token
      };
    } catch (err) {
      const errorMsg = `Error occurred: ${err.message}, 
        Cause: ${err.response.status} ${err.response.statusText}, 
        Data: ${JSON.stringify(err.response.data)}`;
      logger.error(errorMsg);
      throw new Error(errorMsg);
    }
  }
};
