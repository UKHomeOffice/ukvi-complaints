'use strict';

module.exports = {
  url: 'contact-details',
  'email-address': '#email-address',
  'phone-number': '#phone-number',
  validPhoneNumbers: [
    '01234567890',
    '+44 1234 567 890',
    '(0044) 1234 567 890',
    '01234-567-890'
  ],
  invalidPhoneNumbers: [
    'invalid',
    '01234567890!',
    '0123@4567890'
  ],
  validEmailAddress: 'sterling@archer.com',
  invalidEmailAddress: 'invalid'
};
