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

  const showPicture = (evt, posts) => {
    for (let i = 0; i < posts.length; i++) {
      if (evt.target.parentElement.getAttribute(`id`) === `#picture${i + 1}` || evt.target.getAttribute(`id`) === `#picture${i + 1}`) {
        bigPicture.querySelector(`.big-picture__img > img`).src = posts[i].url;
        bigPicture.querySelector(`.likes-count`).textContent = posts[i].likes;
        bigPicture.querySelector(`.comments-count`).textContent = posts[i].comments.length;
        bigPicture.querySelector(`.social__caption`).textContent = posts[i].description;
        renderComments(posts[i]);
      }
    }
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

  const onThumbnailPictureEnter = (evt) => {
    if (evt.key === `Enter`) {
      evt.preventDefault();
      showPicture(evt, window.load.posts);
      bigPictureClose.addEventListener(`click`, onBigPictureCloseClick);
      document.addEventListener(`keydown`, onBigPictureEsc);
    }
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
    onThumbnailPictureClick,
    onThumbnailPictureEnter
  };
})();
