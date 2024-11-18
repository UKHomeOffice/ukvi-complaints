'use strict';

module.exports = superclass => class extends superclass {
  // configure(req, res, next) {
  //   return super.configure(req, res, (err, values) => {
  //     console.log('behaviours', req.form.options.behaviours);
  //     if (!req.sessionModel.get('applicant-email') && !req.sessionModel.get('agent-email')) {
  //       console.log('no applicant email');
  //       req.form.options.behaviours.splice(3, 1);
  //       // return req.form.options.behaviours;
  //       console.log('no customer-email behaviour', req.form.options.behaviours);
  //     }
  //     else {
  //       console.log(req.sessionModel.get('applicant-email'));
  //       console.log(req.sessionModel.get('agent-email'));
  //       console.log('there is an email');
  //       console.log('no customer-email behaviour', req.form.options.behaviours);
  //     }
  //     return next(null, values);
  //   });
  // }
  configure(req, res, next) {
      console.log('behaviours', req.form.options.behaviours);
      if (!req.sessionModel.get('applicant-email') && !req.sessionModel.get('agent-email')) {
        console.log('no applicant email');
        // req.form.options.behaviours.splice(3, 1);
        // return req.form.options.behaviours;
        req.form.options.behaviours = [];
        console.log('no customer-email behaviour', req.form.options.behaviours);
      }
      else {
        console.log(req.sessionModel.get('applicant-email'));
        console.log(req.sessionModel.get('agent-email'));
        console.log('there is an email');
        console.log('no customer-email behaviour', req.form.options.behaviours);
      }
      return super.configure(req, res, next);
    }
  // getValues(req, res, next) {
  //   return super.getValues(req, res, (err, values) => {
  //     if (!req.sessionModel.get('applicant-email') && !req.sessionModel.get('agent-email')) {
  //       console.log('no applicant email');
  //       req.form.options.behaviours.splice(3, 1);
  //       return req.form.options.behaviours;
  //       // console.log('no customer-email behaviour', req.form.options.behaviours);
  //     }
  //     else {
  //       console.log(req.sessionModel.get('applicant-email'));
  //       console.log(req.sessionModel.get('agent-email'));
  //       console.log('there is an email');
  //       console.log('no customer-email behaviour', req.form.options.behaviours);
  //     }
  //     return next(null, values);
  //   });
  // }
};

