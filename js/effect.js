'use strict';

const DEFAULT_EFFECT_LEVEL = 100;
const MAX_LEFT_X = 0;
const effectSlider = window.main.uploadedImage.querySelector(`.effect-level`);
const effectLevelInput = effectSlider.querySelector(`.effect-level__value`);
const effectLine = effectSlider.querySelector(`.effect-level__line`);
const effectDepth = effectSlider.querySelector(`.effect-level__depth`);
let maxRightX = 0;

const calculateEffectLevel = () => {
  effectLevelInput.value = Math.round(window.main.effectPin.offsetLeft / window.main.effectPin.offsetParent.offsetWidth * 100);
  effectDepth.style.width = `${Number(effectLevelInput.value)}%`;
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

const setEffectToOriginal = () => {
  window.main.uploadedImagePreview.className = ``;
  window.main.uploadedImage.querySelectorAll(`.effects__radio`).forEach((element) => {
    element.checked = false;
  });
  window.main.uploadedImage.querySelector(`#effect-none`).checked = true;
  effectSlider.classList.add(`hidden`);
};

const resetEffectLevel = () => {
  effectLevelInput.value = DEFAULT_EFFECT_LEVEL;
  if (!window.main.uploadedImagePreview.classList.contains(`effects__preview--^`)) {
    window.main.uploadedImagePreview.style.filter = ``;
  }
  effectDepth.style.width = `${DEFAULT_EFFECT_LEVEL}%`;
};

const onEffectInputChange = (evt) => {
  if (evt.target && evt.target.matches(`input[type='radio']`)) {
    window.main.uploadedImagePreview.className = ``;
    resetEffectLevel();
    if (evt.target.value !== `none`) {
      effectSlider.classList.remove(`hidden`);
      maxRightX = effectLine.offsetWidth;
      window.main.effectPin.style.left = `${maxRightX}px`;
      window.main.uploadedImagePreview.classList.add(`effects__preview--${evt.target.value}`);
    } else {
      effectSlider.classList.add(`hidden`);
    }
  }
};

const onEffectPinMouseDown = (evt) => {
  evt.preventDefault();
  let startX = evt.clientX;
  maxRightX = effectLine.offsetWidth;

  const onEffectPinMouseMove = (moveEvt) => {
    moveEvt.preventDefault();
    const shiftX = startX - moveEvt.clientX;
    startX = moveEvt.clientX;
    let newX = window.main.effectPin.offsetLeft - shiftX;
    if (newX > maxRightX) {
      newX = maxRightX;
    } else if (newX < MAX_LEFT_X) {
      newX = MAX_LEFT_X;
    }
    window.main.effectPin.style.left = `${newX}px`;
    calculateEffectLevel();
    applyEffectLevel();
  };


  const onEffectPinMouseUp = (upEvt) => {
    upEvt.preventDefault();
    effectSlider.removeEventListener(`mousemove`, onEffectPinMouseMove);
    document.removeEventListener(`mouseup`, onEffectPinMouseUp);
  };

  effectSlider.addEventListener(`mousemove`, onEffectPinMouseMove);
  document.addEventListener(`mouseup`, onEffectPinMouseUp);
};


window.effect = {
  effectLine,
  onEffectInputChange,
  onEffectPinMouseDown,
  resetEffectLevel,
  setEffectToOriginal
};
