'use strict';

const shuffle = (arr) => {
  let i = arr.length;
  let j = 0;
  let temp;
  while (i--) {
    j = Math.floor(Math.random() * (i + 1));
    temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
  return arr;
};

const getGuid = () => {
  return `xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx`.replace(/[xy]/g, (c) => {
    let r = (Math.random() * 16) | 0;
    let v = c === `x` ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

const makeClickable = (arr, cb) => {
  arr.forEach((elem) => {
    elem.setAttribute(`id`, `pic${window.util.getGuid()}`);
    elem.addEventListener(`click`, cb);
  });
  arr = Array.from(arr);
};

const showMessage = (errorMessage) => {
  const loadingError = document.createElement(`div`);
  loadingError.classList.add(`error-message`);
  loadingError.style = `z-index: 3;`;
  loadingError.style.position = `absolute`;
  loadingError.style.top = `10px`;
  loadingError.style.left = `50%`;
  loadingError.style.transform = `translate(-50%)`;
  loadingError.style.width = `max-content`;
  loadingError.style.padding = `10px 40px`;
  loadingError.style.fontSize = `18px`;
  loadingError.style.color = `crimson`;
  loadingError.style.textTransform = `none`;
  loadingError.textContent = errorMessage;
  loadingError.style.backgroundColor = window.getComputedStyle(document.body).getPropertyValue(`background-color`);
  document.body.insertAdjacentElement(`afterbegin`, loadingError);
};

const hideMessage = () => {
  document.querySelector(`.error-message`).remove();
};

window.util = {
  shuffle,
  getGuid,
  makeClickable,
  showMessage,
  hideMessage
};

