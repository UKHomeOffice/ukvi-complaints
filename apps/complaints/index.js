'use strict';

const hof = require('hof');

module.exports = {
  name: 'complaints',
  steps: {
    '/': {
      controller: hof.controllers.start,
      next: '/step1'
    },
    '/step1': {
      fields: ['name-text'],
      next: '/step2'
    },
    '/step2': {
      next: '/step3'
    },
    '/step3': {}
  }
};
