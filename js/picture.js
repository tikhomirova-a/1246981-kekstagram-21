'use strict';

const DATA_URL = `https://21.javascript.pages.academy/kekstagram/data`;

const onSuccess = (posts) => {
  const copyPosts = Object.assign([], window.load.posts);
  window.render.renderPictures(posts);
  window.util.makeClickable(window.thumbnails.getThumbnailPictures(), window.preview.onThumbnailPictureClick);
  window.filter.showFilters();
  window.picture = {
    copyPosts
  };
};

window.load.getData(DATA_URL, onSuccess, window.util.showMessage);
