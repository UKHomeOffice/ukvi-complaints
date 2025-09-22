/* eslint-disable camelcase */

const { model: Model } = require('hof');
const config = require('../../../config');
const applicationsUrl = `${config.saveService.host}:${config.saveService.port}/submitted_applications`;

module.exports = superclass => class extends superclass {
  requestBody(postObj) {
    // set submitted_at to current time
    postObj.submitted_at = new Date();
    return {
      url: applicationsUrl,
      method: 'POST',
      data: postObj
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

      const submissionReference = req.sessionModel.get('submission-reference');

      const params = this.requestBody({ submissionReference, session });
      req.log('info', `Submission Reference: ${submissionReference}, Saving Form Session`);

      try {
        const model = new Model();
        const response = await model._request(params);
        const resBody = response.data;

        if (!resBody || !resBody.length || !resBody[0].id) {
          const errorMessage = `Id hasn't been received in response ${JSON.stringify(response.data)}`;
          req.log('error', errorMessage);
        }
        return next();
      } catch (e) {
        req.log('info', `Submission Reference: ${submissionReference}, Error Saving Session: ${e}`);
        return next(e);
      }
    });
  }
};
