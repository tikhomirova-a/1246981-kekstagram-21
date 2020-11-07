'use strict';

const SERVER_URL = `https://21.javascript.pages.academy/kekstagram`;

const upload = (data, onSuccess, onError) => {
  const xhr = new XMLHttpRequest();
  xhr.responseType = `json`;

  xhr.addEventListener(`load`, () => {
    if (xhr.status === window.main.SUCCESS_STATUS) {
      onSuccess();
      return;
    }
    onError();
  });

  xhr.open(window.main.HttpRequestMethod.POST, SERVER_URL);
  xhr.send(data);
};

window.upload = {
  upload
};
