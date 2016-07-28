/* eslint-disable no-underscore-dangle */

'use strict';

const session = require('./session');

const SESSION_ID = 'fakeId';
const SESSION_KEY = 'hmpo-wizard-0';

class Session extends Helper {

  _getSession() {
    return new Promise((resolve, reject) => {
      session.get(SESSION_ID, (err, sessionData) => {
        if (err) {
          return reject(err);
        }
        return resolve(sessionData);
      });
    });
  }

  getSession() {
    return new Promise((resolve, reject) => {
      this._getSession()
        .then(sessionData => resolve(sessionData[SESSION_KEY]))
        .catch(reject);
    });
  }

  setSessionData(data) {
    return new Promise((resolve, reject) => {
      this.getSession()
        .then(sessionData => {
          this._saveSession(Object.assign(sessionData, data));
        })
        .then(resolve)
        .catch(reject);
    });
  }

  setSessionSteps(steps) {
    return new Promise((resolve, reject) => {
      this.setSessionData({steps})
        .then(resolve)
        .catch(reject);
    });
  }

  _saveSession(data) {
    return new Promise((resolve, reject) => {
      this._getSession().then(sessionData => {
        session.set(SESSION_ID, Object.assign(sessionData, {
          [SESSION_KEY]: data
        }, err => {
          if (err) {
            return reject(err);
          }
          return resolve();
        }));
      });
    });
  }
}

module.exports = Session;
