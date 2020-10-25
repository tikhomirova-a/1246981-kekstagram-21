'use strict';
(function () {
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

  window.util = {
    shuffle,
    getGuid,
    makeClickable
  };
})();

