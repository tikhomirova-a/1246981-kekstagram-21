'use strict';

const FILE_TYPES = [`image/png`, `image/jpeg`, `image/gif`];
const UPLOAD_TIMEOUT = 10000;
const BYTES_IN_1MB = 1048576;
const MAX_FILE_SIZE_MB = 10;

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
  const file = window.main.uploadOpen.files[0];
  const fileType = file.type;
  const matches = FILE_TYPES.some((type) => {
    return fileType === type;
  });
  const fileSizeInMb = file.size / BYTES_IN_1MB;
  if (matches && fileSizeInMb <= MAX_FILE_SIZE_MB) {
    const reader = new FileReader();
    reader.addEventListener(`load`, () => {
      window.main.uploadedImagePreview.src = reader.result;
      const backgroundImage = `url(${reader.result})`;
      const fileThumbnails = window.main.uploadedImage.querySelectorAll(`.effects__preview`);

      Array.from(fileThumbnails).forEach((thumbnail) => {
        thumbnail.style.backgroundImage = backgroundImage;
      });
    });
    reader.readAsDataURL(file);

    reader.addEventListener(`error`, () => {
      window.util.showMessage(`Ошибка загрузки файла`);
    });

    reader.addEventListener(`abort`, () => {
      window.util.showMessage(`Время загрузки файла превысило ${UPLOAD_TIMEOUT / 1000} с`);
    });

    setTimeout(() => {
      reader.abort();
    }, UPLOAD_TIMEOUT);
  }

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
  if (document.querySelector(`.error-message`)) {
    window.util.hideMessage();
  }
};

const onUploadCloseClick = () => {
  closeUploadedImage();
  window.main.uploadClose.removeEventListener(`click`, onUploadCloseClick);
};

window.main.uploadOpen.addEventListener(`change`, () => {
  openUploadedImage();
  window.main.uploadClose.addEventListener(`click`, onUploadCloseClick);
});
