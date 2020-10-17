'use strict';
(function () {
  const pictureTemplate = document.querySelector(`#picture`).content;

  const createPicture = (post) => {
    const picture = pictureTemplate.cloneNode(true);
    picture.querySelector(`.picture__img`).src = post.url;
    picture.querySelector(`.picture__likes`).textContent = post.likes;
    picture.querySelector(`.picture__comments`).textContent = post.comments.length;
    picture.addEventListener(`click`, window.preview.onThumbnailPictureClick);
    return picture;
  };

  const renderPictures = (posts) => {
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < posts.length; i++) {
      fragment.appendChild(createPicture(posts[i]));
    }
    window.main.picturesSection.appendChild(fragment);
  };

  window.render = {
    renderPictures
  };
})();
