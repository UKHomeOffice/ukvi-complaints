'use strict';

const hof = require('hof');

hof({
  behaviours: [
    require('./apps/complaints/behaviours/fields-filter')
  ],
  routes: [
    require('./apps/complaints/')
  ]
});
