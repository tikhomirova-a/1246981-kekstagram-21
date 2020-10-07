'use strict';
(function () {
  const DEFAULT_EFFECT_LEVEL = 100;
  const uploadedImage = document.querySelector(`.img-upload__overlay`);
  const uploadedImagePreview = uploadedImage.querySelector(`.img-upload__preview > img`);
  const effectLevelInput = uploadedImage.querySelector(`.effect-level__value`);
  const effectSlider = uploadedImage.querySelector(`.effect-level`);
  const effectPin = uploadedImage.querySelector(`.effect-level__pin`);

  const calculateEffectLevel = () => {
    effectLevelInput.value = Math.round(effectPin.offsetLeft / effectPin.offsetParent.offsetWidth * 100);
    return Number(effectLevelInput.value);
  };

  const applyEffectLevel = () => {
    if (uploadedImagePreview.classList.contains(`effects__preview--chrome`)) {
      uploadedImagePreview.style.filter = `grayscale(${calculateEffectLevel() / 100})`;
    } else if (uploadedImagePreview.classList.contains(`effects__preview--sepia`)) {
      uploadedImagePreview.style.filter = `sepia(${calculateEffectLevel() / 100})`;
    } else if (uploadedImagePreview.classList.contains(`effects__preview--marvin`)) {
      uploadedImagePreview.style.filter = `invert(${calculateEffectLevel()}%)`;
    } else if (uploadedImagePreview.classList.contains(`effects__preview--phobos`)) {
      uploadedImagePreview.style.filter = `blur(${calculateEffectLevel() * 3 / 100}px)`;
    } else if (uploadedImagePreview.classList.contains(`effects__preview--heat`)) {
      uploadedImagePreview.style.filter = `brightness(${1 + 0.02 * calculateEffectLevel()})`;
    }
  };

  const resetEffectLevel = () => {
    effectLevelInput.value = DEFAULT_EFFECT_LEVEL;
    if (!uploadedImagePreview.classList.contains(`effects__preview--^`)) {
      uploadedImagePreview.style.filter = ``;
    }
  };

  const onEffectInputChange = (evt) => {
    if (evt.target && evt.target.matches(`input[type='radio']`)) {
      uploadedImagePreview.className = ``;
      resetEffectLevel();
      if (evt.target.value !== `none`) {
        effectSlider.classList.remove(`hidden`);
        uploadedImagePreview.classList.add(`effects__preview--${evt.target.value}`);
      } else {
        effectSlider.classList.add(`hidden`);
      }
    }
  };

  const onEffectPinMouseUp = () => {
    calculateEffectLevel();
    applyEffectLevel();
  };

  window.effect = {
    onEffectInputChange,
    onEffectPinMouseUp
  };
})();
