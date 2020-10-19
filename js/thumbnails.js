'use strict';
(function () {
  const getThumbnailPictures = () => {
    return Array.from(document.querySelectorAll(`.picture`));
  };
  window.thumbnails = {
    getThumbnailPictures
  };
})();
