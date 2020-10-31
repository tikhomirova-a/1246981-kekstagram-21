'use strict';

const URL = `https://21.javascript.pages.academy/kekstagram/data`;

const onSuccess = (posts) => {
  const copyPosts = Object.assign([], window.load.posts);
  window.render.renderPictures(posts);
  window.util.makeClickable(window.thumbnails.getThumbnailPictures(), window.preview.onThumbnailPictureClick);
  window.filter.showFilters();
  window.picture = {
    copyPosts
  };
};

const showMessage = (errorMessage) => {
  const loadingError = document.createElement(`div`);
  loadingError.style = `z-index: 3;`;
  loadingError.style.position = `absolute`;
  loadingError.style.top = `10px`;
  loadingError.style.left = `50%`;
  loadingError.style.transform = `translate(-50%)`;
  loadingError.style.width = `max-content`;
  loadingError.style.padding = `10px 20px`;
  loadingError.style.fontSize = `18px`;
  loadingError.style.color = `crimson`;
  loadingError.style.textTransform = `none`;
  loadingError.textContent = errorMessage;
  document.body.insertAdjacentElement(`afterbegin`, loadingError);
};
window.load.getData(URL, onSuccess, showMessage);
