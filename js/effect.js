'use strict';
(function () {
  const DEFAULT_EFFECT_LEVEL = 100;
  const effectLevelInput = window.main.uploadedImage.querySelector(`.effect-level__value`);
  const effectSlider = window.main.uploadedImage.querySelector(`.effect-level`);

  const calculateEffectLevel = () => {
    effectLevelInput.value = Math.round(window.main.effectPin.offsetLeft / window.main.effectPin.offsetParent.offsetWidth * 100);
    return Number(effectLevelInput.value);
  };

  const applyEffectLevel = () => {
    if (window.main.uploadedImagePreview.classList.contains(`effects__preview--chrome`)) {
      window.main.uploadedImagePreview.style.filter = `grayscale(${calculateEffectLevel() / 100})`;
    } else if (window.main.uploadedImagePreview.classList.contains(`effects__preview--sepia`)) {
      window.main.uploadedImagePreview.style.filter = `sepia(${calculateEffectLevel() / 100})`;
    } else if (window.main.uploadedImagePreview.classList.contains(`effects__preview--marvin`)) {
      window.main.uploadedImagePreview.style.filter = `invert(${calculateEffectLevel()}%)`;
    } else if (window.main.uploadedImagePreview.classList.contains(`effects__preview--phobos`)) {
      window.main.uploadedImagePreview.style.filter = `blur(${calculateEffectLevel() * 3 / 100}px)`;
    } else if (window.main.uploadedImagePreview.classList.contains(`effects__preview--heat`)) {
      window.main.uploadedImagePreview.style.filter = `brightness(${1 + 0.02 * calculateEffectLevel()})`;
    }
  };

  const resetEffectLevel = () => {
    effectLevelInput.value = DEFAULT_EFFECT_LEVEL;
    if (!window.main.uploadedImagePreview.classList.contains(`effects__preview--^`)) {
      window.main.uploadedImagePreview.style.filter = ``;
    }
  };

  const onEffectInputChange = (evt) => {
    if (evt.target && evt.target.matches(`input[type='radio']`)) {
      window.main.uploadedImagePreview.className = ``;
      resetEffectLevel();
      if (evt.target.value !== `none`) {
        effectSlider.classList.remove(`hidden`);
        window.main.uploadedImagePreview.classList.add(`effects__preview--${evt.target.value}`);
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
