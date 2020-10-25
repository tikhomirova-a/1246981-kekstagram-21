'use strict';
(function () {
  const FIRST_COMMENT_INDEX = 0;
  const COMMENTS_AMOUNT_MAX = 5;
  const bigPicture = document.querySelector(`.big-picture`);
  const commentList = bigPicture.querySelector(`.social__comments`);
  const bigPictureClose = bigPicture.querySelector(`.big-picture__cancel`);
  const commentsLoader = bigPicture.querySelector(`.comments-loader`);

  const renderComments = (post) => {
    const commentItem = commentList.querySelector(`.social__comment`).cloneNode(true);
    while (commentList.firstChild) {
      commentList.removeChild(commentList.firstChild);
    }
    const renderElements = (start, end, arr, counter) => {
      for (let i = start; i < end; i++, counter++) {
        if (arr[i]) {
          const newElement = commentItem.cloneNode(true);
          newElement.querySelector(`img`).src = arr[i].avatar;
          newElement.querySelector(`img`).alt = arr[i].name;
          newElement.querySelector(`.social__text`).textContent = arr[i].message;
          commentList.appendChild(newElement);
          if (arr.indexOf(arr[i]) === arr.length - 1) {
            bigPicture.querySelector(`.comments-loader`).classList.add(`hidden`);
          }
        }
      }
      bigPicture.querySelector(`.comments-count--showed`).textContent = commentList.children.length;
      return counter;
    };
    renderElements(FIRST_COMMENT_INDEX, COMMENTS_AMOUNT_MAX, post.comments);
    let commentsCounter = COMMENTS_AMOUNT_MAX;

    const onCommentsLoaderClick = () => {
      commentsCounter = renderElements(commentsCounter, commentsCounter + COMMENTS_AMOUNT_MAX, post.comments, commentsCounter);
    };

    commentsLoader.addEventListener(`click`, onCommentsLoaderClick);
    return commentList;
  };

  const getIndex = (id, arr) => {
    const element = document.querySelector(`#${id}`);
    return arr.indexOf(element);
  };

  const showPicture = (evt, posts, thumbnails) => {
    let id = ``;
    if (evt.target.tagName === `IMG`) {
      id = evt.target.parentElement.getAttribute(`id`);
    } else if (evt.target.tagName === `A`) {
      id = evt.target.getAttribute(`id`);
    }
    const index = getIndex(id, thumbnails);
    bigPicture.querySelector(`.big-picture__img > img`).src = posts[index].url;
    bigPicture.querySelector(`.likes-count`).textContent = posts[index].likes;
    bigPicture.querySelector(`.comments-count--all`).textContent = posts[index].comments.length;
    bigPicture.querySelector(`.social__caption`).textContent = posts[index].description;
    renderComments(posts[index]);
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
    showPicture(evt, window.load.posts, window.thumbnails.getThumbnailPictures());
    bigPictureClose.addEventListener(`click`, onBigPictureCloseClick);
    document.addEventListener(`keydown`, onBigPictureEsc);
  };

  const onUpdatedThumbnailPictureClick = (evt) => {
    showPicture(evt, window.filter.updatedPosts, window.thumbnails.getThumbnailPictures());
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
    onThumbnailPictureClick,
    onUpdatedThumbnailPictureClick
  };
})();
