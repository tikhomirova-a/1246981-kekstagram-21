'use strict';
(function () {
  const thumbnailPictures = document.querySelectorAll(`.picture`);
  const bigPicture = document.querySelector(`.big-picture`);
  const commentList = bigPicture.querySelector(`.social__comments`);
  const body = document.querySelector(`body`);

  const renderComments = () => {
    const commentItem = commentList.querySelector(`.social__comment`).cloneNode(true);
    while (commentList.firstChild) {
      commentList.removeChild(commentList.firstChild);
    }
    for (let i = 0; i < window.picture.posts[0].comments.length; i++) {
      const newCommentItem = commentItem.cloneNode(true);
      newCommentItem.querySelector(`img`).src = window.picture.posts[0].comments[i].avatar;
      newCommentItem.querySelector(`img`).alt = window.picture.posts[0].comments[i].name;
      newCommentItem.querySelector(`.social__text`).textContent = window.picture.posts[0].comments[i].message;
      commentList.appendChild(newCommentItem);
    }
    return commentList;
  };

  const showPicture = () => {
    bigPicture.classList.remove(`hidden`);

    bigPicture.querySelector(`.big-picture__img > img`).src = window.picture.posts[0].url;
    bigPicture.querySelector(`.likes-count`).textContent = window.picture.posts[0].likes;
    bigPicture.querySelector(`.comments-count`).textContent = window.picture.posts[0].comments.length;
    bigPicture.querySelector(`.social__caption`).textContent = window.picture.posts[0].description;
    renderComments();
    bigPicture.querySelector(`.social__comment-count`).classList.add(`hidden`);
    bigPicture.querySelector(`.comments-loader`).classList.add(`hidden`);
    body.classList.add(`.modal-open`);
  };

  const onThumbnailPictureClick = () => {
    showPicture();
  };

  for (let i = 0; i < thumbnailPictures.length; i++) {
    thumbnailPictures[i].addEventListener(`click`, onThumbnailPictureClick);
  }
})();
