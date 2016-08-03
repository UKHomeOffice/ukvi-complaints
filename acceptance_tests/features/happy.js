'use strict';

Feature('The app opens');

Scenario('The page loads and has pages..header as header', (I) => {
  I.amOnPage('/');
  I.see('pages..header');
});
