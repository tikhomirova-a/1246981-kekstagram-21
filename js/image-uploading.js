'use strict';
(function () {
  const onUploadedImageEscPress = (evt) => {
    if (evt.key === `Escape` && document.activeElement !== window.main.hashtagInput) {
      evt.preventDefault();
      closeUploadedImage();
    }
  };

  const openUploadedImage = () => {
    window.main.uploadedImage.classList.remove(`hidden`);
    window.main.body.classList.add(`modal-open`);
    document.addEventListener(`keydown`, onUploadedImageEscPress);
    window.main.uploadImageForm.addEventListener(`click`, window.scale.onScaleControlClick);
    window.main.uploadedImage.addEventListener(`change`, window.effect.onEffectInputChange);
    window.main.effectPin.addEventListener(`mouseup`, window.effect.onEffectPinMouseUp);
    window.main.hashtagInput.addEventListener(`input`, window.validation.onHashtagInputInput);
    window.main.hashtagInput.addEventListener(`submit`, window.validation.onHashtagInputSubmit);
  };

  const closeUploadedImage = () => {
    window.main.uploadedImage.classList.add(`hidden`);
    window.main.body.classList.remove(`modal-open`);
    document.removeEventListener(`keydown`, onUploadedImageEscPress);
    window.main.uploadImageForm.removeEventListener(`click`, window.scale.onScaleControlClick);
    window.main.uploadedImage.removeEventListener(`change`, window.effect.onEffectInputChange);
    window.main.hashtagInput.removeEventListener(`input`, window.validation.onHashtagInputInput);
    window.main.hashtagInput.removeEventListener(`submit`, window.validation.onHashtagInputSubmit);
    window.main.uploadOpen.value = ``;
  };

  const onUploadCloseClick = () => {
    closeUploadedImage();
    window.main.uploadClose.removeEventListener(`click`, onUploadCloseClick);
  };

  window.main.uploadOpen.addEventListener(`change`, function () {
    openUploadedImage();
    window.main.uploadClose.addEventListener(`click`, onUploadCloseClick);
  });
})();

