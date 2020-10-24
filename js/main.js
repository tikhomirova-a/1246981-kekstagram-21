'use strict';
(function () {
  const SUCCESS_STATUS = 200;
  const uploadImageForm = document.querySelector(`.img-upload__form`);
  const uploadOpen = uploadImageForm.querySelector(`#upload-file`);
  const uploadedImage = uploadImageForm.querySelector(`.img-upload__overlay`);
  const uploadClose = uploadedImage.querySelector(`#upload-cancel`);
  const hashtagInput = uploadedImage.querySelector(`.text__hashtags`);
  const commentInput = uploadedImage.querySelector(`.text__description`);
  const body = document.querySelector(`body`);
  const effectPin = uploadedImage.querySelector(`.effect-level__pin`);
  const uploadedImagePreview = uploadedImage.querySelector(`.img-upload__preview > img`);
  const picturesSection = document.querySelector(`.pictures`);
  window.main = {
    uploadImageForm,
    uploadOpen,
    uploadedImage,
    uploadClose,
    hashtagInput,
    commentInput,
    body,
    effectPin,
    uploadedImagePreview,
    picturesSection,
    SUCCESS_STATUS
  };
})();
