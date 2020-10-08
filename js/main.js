'use strict';
(function () {
  const uploadImageForm = document.querySelector(`.img-upload__form`);
  const uploadOpen = uploadImageForm.querySelector(`#upload-file`);
  const uploadedImage = uploadImageForm.querySelector(`.img-upload__overlay`);
  const uploadClose = uploadedImage.querySelector(`#upload-cancel`);
  const hashtagInput = uploadedImage.querySelector(`.text__hashtags`);
  const body = document.querySelector(`body`);
  const effectPin = uploadedImage.querySelector(`.effect-level__pin`);
  const uploadedImagePreview = uploadedImage.querySelector(`.img-upload__preview > img`);
  window.main = {
    uploadImageForm,
    uploadOpen,
    uploadedImage,
    uploadClose,
    hashtagInput,
    body,
    effectPin,
    uploadedImagePreview
  };
})();
