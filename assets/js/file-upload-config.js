/**
 * Shared file upload configuration used by both frontend and backend.
 */

module.exports = {
  maxFileSizeInBytes: 21 * 1000 * 1000, // 21MB in bytes
  allowedMimeTypes: [
    'application/pdf',
    'image/jpeg',
    'image/jpg',
    'image/png'
  ],
  documentCategories: {
    'upload-complaint-doc': {
      allowMultipleUploads: true,
      limit: 3,
      limitValidationError: 'maxComplaintUpload'
    }
  }
};
