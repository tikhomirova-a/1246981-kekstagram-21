'use strict';
(function () {
  const SUCCESS_STATUS = 200;
  const TIMEOUT_IN_MS = 10000;
  let posts = [];

  const getData = (url, onSuccess, onError) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = `json`;
    xhr.addEventListener(`load`, function () {
      if (xhr.status === SUCCESS_STATUS) {
        const data = xhr.response;
        for (let i = 0; i < data.length; i++) {
          posts.push(data[i]);
        }
        onSuccess(data);
        return;
      }
      onError(`Ошибка ${xhr.status}: ${xhr.statusText}`);
    });
    xhr.addEventListener(`error`, function () {
      onError(`Произошла ошибка соединения`);
    });

    xhr.addEventListener(`timeout`, function () {
      onError(`Запрос не успел выполниться за ${xhr.timeout}мс`);
    });

    xhr.timeout = TIMEOUT_IN_MS;
    xhr.open(`GET`, url);
    xhr.send();
  };
  window.load = {
    getData,
    posts
  };
})();
