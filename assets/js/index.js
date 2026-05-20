'use strict';

require('hof/frontend/themes/gov-uk/client-js');
const accessibleAutocomplete = require('accessible-autocomplete');
const { initFileUpload } = require('./file-upload');

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.typeahead').forEach(function applyTypeahead(element) {
    accessibleAutocomplete.enhanceSelectElement({
      defaultValue: '',
      selectElement: element
    });
  });

  // Initialise file upload logic
  initFileUpload();
});
