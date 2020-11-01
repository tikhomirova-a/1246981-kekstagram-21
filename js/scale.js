'use strict';

const SCALE_SIZE_MAX = 100;
const SCALE_SIZE_MIN = 25;
const SCALE_SIZE_STEP = 25;
const scaleControlSmaller = window.main.uploadedImage.querySelector(`.scale__control--smaller`);
const scaleControlBigger = window.main.uploadedImage.querySelector(`.scale__control--bigger`);
const scaleControlInput = window.main.uploadedImage.querySelector(`.scale__control--value`);
let scaleSize = Number(scaleControlInput.value.split(`%`)[0]);

const changeScale = () => {
  window.main.uploadedImagePreview.style.transform = `scale(${scaleSize / 100})`;
};

const setScaleToDefault = () => {
  scaleControlInput.value = `${SCALE_SIZE_MAX}%`;
  scaleSize = SCALE_SIZE_MAX;
  changeScale();
};

const onScaleControlClick = (evt) => {
  if (evt.target === scaleControlBigger) {
    if (scaleSize < SCALE_SIZE_MAX) {
      scaleSize += SCALE_SIZE_STEP;
    } else {
      scaleSize = SCALE_SIZE_MAX;
    }
  } else if (evt.target === scaleControlSmaller) {
    if (scaleSize > SCALE_SIZE_MIN) {
      scaleSize -= SCALE_SIZE_STEP;
    } else {
      scaleSize = SCALE_SIZE_MIN;
    }
  }
  scaleControlInput.value = scaleSize + `%`;
  changeScale();
};

window.scale = {
  onScaleControlClick,
  setScaleToDefault
};
