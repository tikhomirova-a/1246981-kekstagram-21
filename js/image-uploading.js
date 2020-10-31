'use strict';
(function () {
  const onUploadedImageEscPress = (evt) => {
    if (evt.key === `Escape` && document.activeElement !== window.main.hashtagInput
    && document.activeElement !== window.main.commentInput) {
      evt.preventDefault();
      closeUploadedImage();
    }
  };
  const resetForm = () => {
    window.scale.setScaleToDefault();
    window.effect.resetEffectLevel();
    window.effect.setEffectToOriginal();
    window.main.hashtagInput.value = ``;
    window.main.commentInput.value = ``;
    window.main.uploadOpen.value = ``;
  };

  const showMessage = (status) => {
    const message = document.querySelector(`#${status}`).content.cloneNode(true);
    const fragment = document.createDocumentFragment();
    fragment.appendChild(message);
    document.querySelector(`main`).insertBefore(fragment, document.querySelector(`.img-filters`));

    const hideMessage = () => {
      document.querySelector(`main`).removeChild(document.querySelector(`section.${status}`));
      document.removeEventListener(`click`, onMessageClick);
      document.removeEventListener(`keydown`, onMessageEsc);
    };

    const onMessageEsc = (evt) => {
      if (evt.key === `Escape`) {
        evt.preventDefault();
        hideMessage();
      }
    };

    const onMessageClick = () => {
      hideMessage();
    };

    document.querySelector(`.${status}__button`).addEventListener(`click`, onMessageClick);
    document.addEventListener(`click`, onMessageClick);
    document.addEventListener(`keydown`, onMessageEsc);
  };

  const onFormSuccess = () => {
    closeUploadedImage();
    showMessage(`success`);
  };

  const onFormError = () => {
    closeUploadedImage();
    showMessage(`error`);
  };

  const onFormSubmit = (evt) => {
    window.upload.upload(new FormData(window.main.uploadImageForm), onFormSuccess, onFormError);
    evt.preventDefault();
  };

  const openUploadedImage = () => {
    window.main.uploadedImage.classList.remove(`hidden`);
    window.main.effectPin.style.left = `${window.effect.effectLine.offsetWidth}px`;
    window.main.body.classList.add(`modal-open`);
    document.addEventListener(`keydown`, onUploadedImageEscPress);
    window.main.uploadImageForm.addEventListener(`click`, window.scale.onScaleControlClick);
    window.main.uploadedImage.addEventListener(`change`, window.effect.onEffectInputChange);
    window.main.effectPin.addEventListener(`mousedown`, window.effect.onEffectPinMouseDown);
    window.main.hashtagInput.addEventListener(`input`, window.validation.onHashtagInputInput);
    window.main.hashtagInput.addEventListener(`submit`, window.validation.onFormInputSubmit);
    window.main.commentInput.addEventListener(`input`, window.validation.onCommentInputInput);
    window.main.uploadImageForm.addEventListener(`submit`, onFormSubmit);
  };

  const closeUploadedImage = () => {
    document.removeEventListener(`keydown`, onUploadedImageEscPress);
    window.main.uploadImageForm.removeEventListener(`click`, window.scale.onScaleControlClick);
    window.main.uploadedImage.removeEventListener(`change`, window.effect.onEffectInputChange);
    window.main.effectPin.removeEventListener(`mousedown`, window.effect.onEffectPinMouseDown);
    window.main.hashtagInput.removeEventListener(`input`, window.validation.onHashtagInputInput);
    window.main.hashtagInput.removeEventListener(`submit`, window.validation.onFormInputSubmit);
    window.main.commentInput.removeEventListener(`input`, window.validation.onCommentInputInput);
    resetForm();
    window.main.uploadedImage.classList.add(`hidden`);
    window.main.body.classList.remove(`modal-open`);
  };

  const onUploadCloseClick = () => {
    closeUploadedImage();
    window.main.uploadClose.removeEventListener(`click`, onUploadCloseClick);
  };

  window.main.uploadOpen.addEventListener(`change`, () => {
    openUploadedImage();
    window.main.uploadClose.addEventListener(`click`, onUploadCloseClick);
  });
})();

