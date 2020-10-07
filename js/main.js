'use strict';
const uploadImageForm = document.querySelector(`.img-upload__form`);
const uploadOpen = uploadImageForm.querySelector(`#upload-file`);
const uploadedImage = uploadImageForm.querySelector(`.img-upload__overlay`);
const uploadClose = uploadedImage.querySelector(`#upload-cancel`);
const hashtagInput = uploadedImage.querySelector(`.text__hashtags`);
const body = document.querySelector(`body`);
const effectPin = uploadedImage.querySelector(`.effect-level__pin`);

const onUploadedImageEscPress = (evt) => {
  if (evt.key === `Escape` && document.activeElement !== hashtagInput) {
    evt.preventDefault();
    closeUploadedImage();
  }
};

const openUploadedImage = () => {
  uploadedImage.classList.remove(`hidden`);
  body.classList.add(`modal-open`);
  document.addEventListener(`keydown`, onUploadedImageEscPress);
  uploadImageForm.addEventListener(`click`, window.scale.onScaleControlClick);
  uploadedImage.addEventListener(`change`, window.effect.onEffectInputChange);
  effectPin.addEventListener(`mouseup`, window.effect.onEffectPinMouseUp);
  hashtagInput.addEventListener(`input`, window.validation.onHashtagInput);
  hashtagInput.addEventListener(`submit`, window.validation.onHashtagSubmit);
};

const closeUploadedImage = () => {
  uploadedImage.classList.add(`hidden`);
  body.classList.remove(`modal-open`);
  document.removeEventListener(`keydown`, onUploadedImageEscPress);
  uploadImageForm.removeEventListener(`click`, window.scale.onScaleControlClick);
  uploadedImage.removeEventListener(`change`, window.effect.onEffectInputChange);
  hashtagInput.removeEventListener(`input`, window.validation.onHashtagInput);
  hashtagInput.removeEventListener(`submit`, window.validation.onHashtagSubmit);
  uploadOpen.value = ``;
};

const onUploadCloseClick = () => {
  closeUploadedImage();
  uploadClose.removeEventListener(`click`, onUploadCloseClick);
};

uploadOpen.addEventListener(`change`, function () {
  openUploadedImage();
  uploadClose.addEventListener(`click`, onUploadCloseClick);
});
