'use strict';
(function () {
  const URL = `https://21.javascript.pages.academy/kekstagram`;

  const upload = (data, onSuccess, onError) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = `json`;

    xhr.addEventListener(`load`, function () {
      if (xhr.status === window.main.SUCCESS_STATUS) {
        onSuccess();
        return;
      }
      onError();
    });

    xhr.open(`POST`, URL);
    xhr.send(data);
  };

  window.upload = {
    upload
  };
})();
