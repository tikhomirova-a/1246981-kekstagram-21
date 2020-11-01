'use strict';

const TIMEOUT_IN_MS = 10000;
let posts = [];

const getData = (url, onSuccess, onError) => {
  const xhr = new XMLHttpRequest();
  xhr.responseType = `json`;
  xhr.addEventListener(`load`, () => {
    if (xhr.status === window.main.SUCCESS_STATUS) {
      const data = xhr.response;
      data.forEach((elem) => posts.push(elem));
      onSuccess(data);
      return;
    }
    onError(`Ошибка ${xhr.status}: ${xhr.statusText}`);
  });
  xhr.addEventListener(`error`, () => {
    onError(`Произошла ошибка соединения`);
  });

  xhr.addEventListener(`timeout`, () => {
    onError(`Запрос не успел выполниться за ${xhr.timeout} мс`);
  });

  xhr.timeout = TIMEOUT_IN_MS;
  xhr.open(`GET`, url);
  xhr.send();
};
window.load = {
  getData,
  posts
};
