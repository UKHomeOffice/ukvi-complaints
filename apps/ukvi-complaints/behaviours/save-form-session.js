'use strict';

const { model: Model } = require('hof');
const config = require('../../../config');
const { generateErrorMsg } = require('../../../lib/utils');
const { protocol, host, port } = config.saveService;
const applicationsUrl = `${protocol}://${host}:${port}/submitted_applications`;

const host = config?.saveService?.host ?? 'http://localhost';
const port = config?.saveService?.port ?? 8080;
const applicationsUrl = `${host}:${port}/submitted_applications`;

module.exports = superclass => class extends superclass {
  requestBody(id, patchObj, postObj) {
    if (id === undefined || id.length === 0) {
      postObj.submitted_at = new Date();
      return {
        url: applicationsUrl,
        method: 'POST',
        data: postObj
      };
    }

    // set submitted_at to current time
    patchObj.submitted_at = new Date();
    return {
      url: applicationsUrl + `/${id}`,
      method: 'PATCH',
      data: patchObj
    };
  }

  getSession(req) {
    // remove csrf secret and errors from session data to prevent CSRF Secret issues in the session
    const session = req.sessionModel.toJSON();
    delete session['csrf-secret'];
    delete session.errors;

    if (session.steps.indexOf(req.path) === -1) {
      session.steps.push(req.path);
    }
    // ensure no /edit steps are add to the steps property when we save to the store
    session.steps = session.steps.filter(step => !step.match(/\/change|edit$/));

    return session;
  }

  async saveValues(req, res, next) {
    return super.saveValues(req, res, async err => {
      if (err) {
        return next(err);
      }
      const session = this.getSession(req);

      // skip requesting data service api when running in local and test mode
      if (config.env === 'local' || config.env === 'test') {
        return next();
      }

      const id = req.sessionModel.get('id');
      const submissionReference = req.sessionModel.get('submission-reference');
      const params = this.requestBody(id, { session }, { submission_reference: submissionReference, session });

      req.log('info', `Submission Reference: ${submissionReference}, Saving Form Session: ${id}`);

      try {
        const model = new Model();
        const response = await model._request(params);
        const resBody = response.data;

        if (resBody && resBody.length && resBody[0].id) {
          req.sessionModel.set('id', resBody[0].id);
        } else {
          const errorMessage = `Id hasn't been received in response ${JSON.stringify(response.data)}`;
          req.sessionModel.unset('id');
          throw new Error(errorMessage);
        }
        return next();
      } catch (e) {
        req.log('error', `Submission Reference: ${submissionReference}, Error Saving Session: ${generateErrorMsg(e)}`);
        return next(e);
      }
    });
  }
};
