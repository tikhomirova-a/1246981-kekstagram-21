'use strict';
(function () {
  const uploadedImage = document.querySelector(`.img-upload__overlay`);
  const scaleControlSmaller = uploadedImage.querySelector(`.scale__control--smaller`);
  const scaleControlBigger = uploadedImage.querySelector(`.scale__control--bigger`);
  const scaleControlInput = uploadedImage.querySelector(`.scale__control--value`);
  const uploadedImagePreview = uploadedImage.querySelector(`.img-upload__preview > img`);
  let scaleSize = Number(scaleControlInput.value.split(`%`)[0]);

  const changeScale = () => {
    uploadedImagePreview.style.transform = `scale(${scaleSize / 100})`;
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
