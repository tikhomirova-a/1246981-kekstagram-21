'use strict';
(function () {
  const bigPicture = document.querySelector(`.big-picture`);
  const commentList = bigPicture.querySelector(`.social__comments`);
  const bigPictureClose = bigPicture.querySelector(`.big-picture__cancel`);

  const renderComments = (post) => {
    const commentItem = commentList.querySelector(`.social__comment`).cloneNode(true);
    while (commentList.firstChild) {
      commentList.removeChild(commentList.firstChild);
    }
    for (let i = 0; i < post.comments.length; i++) {
      const newCommentItem = commentItem.cloneNode(true);
      newCommentItem.querySelector(`img`).src = post.comments[i].avatar;
      newCommentItem.querySelector(`img`).alt = post.comments[i].name;
      newCommentItem.querySelector(`.social__text`).textContent = post.comments[i].message;
      commentList.appendChild(newCommentItem);
    }
    return commentList;
  };

  const getIndex = (id) => {
    const element = document.querySelector(`#${id}`);
    return Array.from(window.picture.thumbnailPictures).indexOf(element);
  };

  const showPicture = (evt, posts) => {
    let id = ``;
    if (evt.target.tagName === `IMG`) {
      id = evt.target.parentElement.getAttribute(`id`);
    } else if (evt.target.tagName === `A`) {
      id = evt.target.getAttribute(`id`);
    }
    const index = getIndex(id);
    bigPicture.querySelector(`.big-picture__img > img`).src = posts[index].url;
    bigPicture.querySelector(`.likes-count`).textContent = posts[index].likes;
    bigPicture.querySelector(`.comments-count`).textContent = posts[index].comments.length;
    bigPicture.querySelector(`.social__caption`).textContent = posts[index].description;
    renderComments(posts[index]);
    bigPicture.querySelector(`.social__comment-count`).classList.add(`hidden`);
    bigPicture.querySelector(`.comments-loader`).classList.add(`hidden`);
    bigPicture.classList.remove(`hidden`);
    window.main.body.classList.add(`modal-open`);
  };

  const hidePicture = () => {
    bigPicture.querySelector(`.social__comment-count`).classList.remove(`hidden`);
    bigPicture.querySelector(`.comments-loader`).classList.remove(`hidden`);
    bigPicture.classList.add(`hidden`);
    window.main.body.classList.remove(`modal-open`);
    bigPictureClose.removeEventListener(`click`, onBigPictureCloseClick);
    document.removeEventListener(`keydown`, onBigPictureEsc);
  };

  const onThumbnailPictureClick = (evt) => {
    showPicture(evt, window.load.posts);
    bigPictureClose.addEventListener(`click`, onBigPictureCloseClick);
    document.addEventListener(`keydown`, onBigPictureEsc);
  };

  const onBigPictureEsc = (evt) => {
    if (evt.key === `Escape`) {
      evt.preventDefault();
      hidePicture();
    }
  };

  const onBigPictureCloseClick = () => {
    hidePicture();
  };

  window.preview = {
    onThumbnailPictureClick
  };
})();
