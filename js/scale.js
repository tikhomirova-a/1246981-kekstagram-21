'use strict';
(function () {
  const scaleControlSmaller = window.main.uploadedImage.querySelector(`.scale__control--smaller`);
  const scaleControlBigger = window.main.uploadedImage.querySelector(`.scale__control--bigger`);
  const scaleControlInput = window.main.uploadedImage.querySelector(`.scale__control--value`);
  let scaleSize = Number(scaleControlInput.value.split(`%`)[0]);

  const changeScale = () => {
    window.main.uploadedImagePreview.style.transform = `scale(${scaleSize / 100})`;
  };

  const onScaleControlClick = (evt) => {
    if (evt.target === scaleControlBigger) {
      if (scaleSize < 100) {
        scaleSize += 25;
      } else {
        scaleSize = 100;
      }
    } else if (evt.target === scaleControlSmaller) {
      if (scaleSize > 25) {
        scaleSize -= 25;
      } else {
        scaleSize = 25;
      }
    }
    scaleControlInput.value = scaleSize + `%`;
    changeScale();
  };

  window.scale = {
    onScaleControlClick
  };
})();