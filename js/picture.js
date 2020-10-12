'use strict';
(function () {
  const URL = `https://21.javascript.pages.academy/kekstagram/data`;
  const pictureTemplate = document.querySelector(`#picture`).content;

  const createPicture = (post) => {
    const picture = pictureTemplate.cloneNode(true);
    picture.querySelector(`.picture__img`).src = post.url;
    picture.querySelector(`.picture__likes`).textContent = post.likes;
    picture.querySelector(`.picture__comments`).textContent = post.comments.length;
    return picture;
  };

  const renderPictures = (posts) => {
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < posts.length; i++) {
      fragment.appendChild(createPicture(posts[i]));
    }
    const picturesSection = document.querySelector(`.pictures`);
    picturesSection.appendChild(fragment);
  };
  const onSuccess = (posts) => {
    renderPictures(posts);
    const thumbnailPictures = document.querySelectorAll(`.picture`);
    for (let i = 0; i < thumbnailPictures.length; i++) {
      thumbnailPictures[i].setAttribute(`id`, `#picture${i + 1}`);
      thumbnailPictures[i].addEventListener(`click`, window.preview.onThumbnailPictureClick);
      thumbnailPictures[i].addEventListener(`keydown`, window.preview.onThumbnailPictureEnter);
    }
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
})();
