'use strict';
(function () {
  const RANDOM_POSTS_START = 0;
  const RANDOM_POSTS_AMOUNT = 10;
  const filters = document.querySelector(`.img-filters`);

  const showFilters = () => {
    filters.classList.remove(`img-filters--inactive`);
    defaultFilter.addEventListener(`click`, onDefaultFilterClick);
    randomFilter.addEventListener(`click`, onRandomFilterClick);
    discussedFilter.addEventListener(`click`, onDiscussedFilterClick);
  };

  const updatePictures = (updatedPosts) => {
    while (document.querySelector(`.picture`)) {
      document.querySelector(`.picture`).remove();
    }
    window.render.renderPictures(updatedPosts);
    return updatedPosts;
  };

  const showDefault = () => {
    updatePictures(window.load.posts);
    window.util.makeClickable(window.thumbnails.getThumbnailPictures(), window.preview.onThumbnailPictureClick);
  };
  let updatedPosts;

  const showRandom = () => {
    updatedPosts = [];
    updatedPosts = window.util.shuffle(window.picture.copyPosts).slice(RANDOM_POSTS_START, RANDOM_POSTS_AMOUNT);
    updatePictures(updatedPosts);
    window.util.makeClickable(window.thumbnails.getThumbnailPictures(), window.preview.onUpdatedThumbnailPictureClick);
    window.filter = {
      updatedPosts
    };
  };

  const showDiscussed = () => {
    updatedPosts = [];
    updatedPosts = window.picture.copyPosts.sort(function (left, right) {
      if (left.comments.length > right.comments.length) {
        return -1;
      } else if (left.comments.length < right.comments.length) {
        return 1;
      } else {
        return 0;
      }
    });
    updatePictures(updatedPosts);
    window.util.makeClickable(window.thumbnails.getThumbnailPictures(), window.preview.onUpdatedThumbnailPictureClick);
    window.filter = {
      updatedPosts
    };
  };

  const defaultFilter = filters.querySelector(`#filter-default`);
  const randomFilter = filters.querySelector(`#filter-random`);
  const discussedFilter = filters.querySelector(`#filter-discussed`);

  const onDefaultFilterClick = window.debounce.debounce(function () {
    filters.querySelectorAll(`.img-filters__button`).forEach((element) => element.classList.remove(`img-filters__button--active`));
    defaultFilter.classList.add(`img-filters__button--active`);
    showDefault();
  });

  const onRandomFilterClick = window.debounce.debounce(function () {
    filters.querySelectorAll(`.img-filters__button`).forEach((element) => element.classList.remove(`img-filters__button--active`));
    randomFilter.classList.add(`img-filters__button--active`);
    showRandom();
  });

  const onDiscussedFilterClick = window.debounce.debounce(function () {
    filters.querySelectorAll(`.img-filters__button`).forEach((element) => element.classList.remove(`img-filters__button--active`));
    discussedFilter.classList.add(`img-filters__button--active`);
    showDiscussed();
  });

  window.filter = {
    showFilters
  };
})();
