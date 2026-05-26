'use strict';

const uploadConfig = require('./file-upload-config');

/**
 * Handles the status of the file upload process.
 *
 * @param {string} status - The current status of the file upload ('ready', 'error', 'uploading').
 * @param {string} [errorType] - The type of error (if applicable).
 * @param {object} options - Additional DOM elements and configurations.
 */
const fileUploadStatusHandler = (status, errorType, options) => {
  const {
    fileUploadComponent,
    uploadPageLoaderContainer,
    fileUpload,
    continueWithoutUpload,
    removeLinks
  } = options;

  const fileUploadErrorMsg = fileUploadComponent.querySelectorAll('.govuk-error-message');

  switch (status) {
    case 'ready':
      if (fileUploadComponent) {
        fileUploadComponent.classList.remove('govuk-form-group--error');
      }
      if (fileUploadErrorMsg) {
        fileUploadErrorMsg.forEach(element => {
          element.classList.add('govuk-!-display-none');
        });
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
      fileUpload.ariaDisabled = true;
      continueWithoutUpload.forEach(a => {
        a.disabled = true;
        a.ariaDisabled = true;
      });
      removeLinks.forEach(a => {
        a.classList.add('disabled-link');
      });
      break;
    default:
      break;
  }
};

/**
 * Initialises the file upload logic.
 */
const initFileUpload = () => {
  const fileUpload = document.getElementById('file-upload');
  const uploadPageLoaderContainer = document.getElementById('upload-page-loading-spinner');
  const continueWithoutUpload = document.getElementsByName('continueWithoutUpload');
  const removeLinks = document.querySelectorAll('#uploaded-documents > div > div > a');

  if (fileUpload) {
    fileUpload.addEventListener('change', () => {
      fileUploadStatusHandler('ready', null, {
        fileUploadComponent: document.getElementById('hofFileUpload'),
        uploadPageLoaderContainer,
        fileUpload,
        continueWithoutUpload,
        removeLinks
      });

      const fileInfo = fileUpload.files && fileUpload.files.length > 0 ? fileUpload.files[0] : null;

      // Retrieve the document-category attribute from the file input field
      const documentCategory = fileUpload.getAttribute('document-category');

      if (fileInfo) {
        if (fileInfo.size > uploadConfig.maxFileSizeInBytes) {
          fileUploadStatusHandler('error', 'maxFileSize', {
            fileUploadComponent: document.getElementById('hofFileUpload')
          });
          return;
        }

        // Get allowedMimeTypes for the documentCategory or fallback to global allowedMimeTypes
        const documentCategoryConfig = uploadConfig.documentCategories[documentCategory];
        const allowedMimeTypes =
          (documentCategoryConfig && documentCategoryConfig.allowedMimeTypes) || uploadConfig.allowedMimeTypes;

        if (!allowedMimeTypes.includes(fileInfo.type)) {
          fileUploadStatusHandler('error', 'fileType', {
            fileUploadComponent: document.getElementById('hofFileUpload')
          });
          return;
        }

        document.querySelector('[name=file-upload-form]').submit();
        fileUploadStatusHandler('uploading', null, {
          fileUploadComponent: document.getElementById('hofFileUpload'),
          uploadPageLoaderContainer,
          fileUpload,
          continueWithoutUpload,
          removeLinks
        });
      }
    });
  }
};

module.exports = {
  initFileUpload
};
