'use strict';
(function () {
  const MIN_HASHTAG_LENGTH = 2;
  const MAX_HASHTAG_LENGTH = 20;

  const onHashtagInputInput = () => {
    const hashtags = window.main.hashtagInput.value.split(` `);
    for (let i = 0; i < hashtags.length; i++) {
      const re = /^#[\w]*$/;
      re.test(hashtags[i]);
      if (!re.test(hashtags[i])) {
        window.main.hashtagInput.setCustomValidity(`Хэштег должен начинаться с #, а затем состоять только из цифр или английских букв.`);
      } else if (hashtags[i].length > MAX_HASHTAG_LENGTH) {
        window.main.hashtagInput.setCustomValidity(`Удалите ` + (hashtags[i].length - MAX_HASHTAG_LENGTH) + ` симв.`);
      } else if (hashtags[i].length < MIN_HASHTAG_LENGTH && hashtags.length <= 5) {
        window.main.hashtagInput.setCustomValidity(`Добавьте еще хотя бы ` + (MIN_HASHTAG_LENGTH - hashtags[i].length) + ` симв.`);
      } else if (hashtags.length > 5) {
        window.main.hashtagInput.setCustomValidity(`Укажите не более пяти хэштегов.`);
      } else if (i > 0) {
        for (let j = 1; j <= i; j++) {
          if (String(hashtags[i]).toLowerCase() === String(hashtags[i - j]).toLowerCase()) {
            window.main.hashtagInput.setCustomValidity(`Хэштеги не должны повторяться.`);
          }
        }
      } else {
        window.main.hashtagInput.setCustomValidity(``);
      }
    }
    window.main.hashtagInput.reportValidity();
  };

  const onHashtagInputSubmit = (evt) => {
    if (!window.main.hashtagInput.validity.valid) {
      evt.preventDefault();
    }
  };
  window.validation = {
    onHashtagInputInput,
    onHashtagInputSubmit
  };
})();
