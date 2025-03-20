'use strict';

require('hof/frontend/themes/gov-uk/client-js');
const $ = require('jquery');
const typeahead = require('typeahead-aria');
const Bloodhound = require('typeahead-aria').Bloodhound;

const config = require('../../config');

typeahead.loadjQueryPlugin();

$('.typeahead').each(() => {
  const $el = $(this);
  const $parent = $el.parent();
  const attributes = $el.prop('attributes');
  const $input = $('<input/>');
  const selectedValue = $el.val();
  const typeaheadList = $el.find('option').map(() => {
    if (this.value === '') {
      return undefined;
    }
    return this.value;
  }).get();

  // remove the selectbox
  $el.remove();

  $.each(attributes, () => {
    $input.attr(this.name, this.value);
  });

  $input.removeClass('js-hidden');
  $input.addClass('form-control');
  $input.val(selectedValue);

  $parent.append($input);

  $input.typeahead({
    hint: false
  }, {
    source: new Bloodhound({
      datumTokenizer: Bloodhound.tokenizers.whitespace,
      queryTokenizer: Bloodhound.tokenizers.whitespace,
      local: typeaheadList,
      sorter: (a, b) => {
        const input = $input.val();
        const startsWithInput = x => {
          return x.toLowerCase().substr(0, input.length) === input.toLowerCase() ? -1 : 1;
        };

        const compareAlpha = (x, y) => {
          const less = x < y ? -1 : 1;
          return x === y ? 0 : less;
        };

        const compareStartsWithInput = (x, y) => {
          const startsWithFirst = startsWithInput(x);
          const startsWithSecond = startsWithInput(y);

          return startsWithFirst === startsWithSecond ? 0 : startsWithFirst;
        };

        const first = compareStartsWithInput(a, b);

        return first === 0 ? compareAlpha(a, b) : first;
      }
    }),
    limit: 100
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const fileUpload = document.getElementById('file-upload');
  const uploadPageLoaderContainer = document.getElementById('upload-page-loading-spinner');
  const optionalFileUpload = document.getElementsByName('optionalFileUpload');
  const removeLinks = document.querySelectorAll('#uploaded-documents > div > div > a');

  const fileUploadStatusHandler = (status, errorType) => {
    const fileUploadComponent = document.getElementById('hofFileUpload');
    const fileUploadErrorMsg = fileUploadComponent.querySelector('.govuk-error-message');
    switch (status) {
      case 'ready':
        if (fileUploadComponent) {
          fileUploadComponent.classList.remove('govuk-form-group--error');
        }
        if (fileUploadErrorMsg) {
          fileUploadErrorMsg.classList.add('govuk-!-display-none');
        }
        break;
      case 'error':
        if (fileUploadComponent) {
          fileUploadComponent.classList.add('govuk-form-group--error');
          document.getElementById(`file-upload-error-${errorType}`).classList.remove('govuk-!-display-none');
        }
        break;
      case 'uploading':
        uploadPageLoaderContainer.style.display = 'flex';
        fileUpload.disabled = true;
        fileUpload.setAttribute('aria-disabled', 'true');
        optionalFileUpload.forEach(optionalContinueBtn => {
          optionalContinueBtn.disabled = true;
          optionalContinueBtn.setAttribute('aria-disabled', 'true');
        });
        removeLinks.forEach(a => {
          a.classList.add('disabled-link');
        });
        break;
      default:
        break;
    }
  };

  if (fileUpload) {
    fileUpload.addEventListener('change', () => {
      fileUploadStatusHandler('ready');
      const fileInfo = fileUpload.files && fileUpload.files.length > 0 ? fileUpload.files[0] : null;
      if (fileInfo) {
        if (fileInfo.size > config.upload.maxFileSizeInBytes) {
          fileUploadStatusHandler('error', 'maxFileSize');
          return;
        }
        if (!config.upload.allowedMimeTypes.includes(fileInfo.type) ) {
          fileUploadStatusHandler('error', 'fileType');
          return;
        }
      }

      document.querySelector('[name=file-upload-form]').submit();
      fileUploadStatusHandler('uploading');
    });
  }
});
