'use strict';
(function () {
  const MIN_HASHTAG_LENGTH = 2;
  const MAX_HASHTAG_LENGTH = 20;
  const uploadedImage = document.querySelector(`.img-upload__overlay`);
  const hashtagInput = uploadedImage.querySelector(`.text__hashtags`);

  const onHashtagInputInput = () => {
    const hashtags = hashtagInput.value.split(` `);
    for (let i = 0; i < hashtags.length; i++) {
      const re = /^#[\w]*$/;
      re.test(hashtags[i]);
      if (!re.test(hashtags[i])) {
        hashtagInput.setCustomValidity(`Хэштег должен начинаться с #, а затем состоять только из цифр или английских букв.`);
      } else if (hashtags[i].length > MAX_HASHTAG_LENGTH) {
        hashtagInput.setCustomValidity(`Удалите ` + (hashtags[i].length - MAX_HASHTAG_LENGTH) + ` симв.`);
      } else if (hashtags[i].length < MIN_HASHTAG_LENGTH && hashtags.length <= 5) {
        hashtagInput.setCustomValidity(`Добавьте еще хотя бы ` + (MIN_HASHTAG_LENGTH - hashtags[i].length) + ` симв.`);
      } else if (hashtags.length > 5) {
        hashtagInput.setCustomValidity(`Укажите не более пяти хэштегов.`);
      } else if (i > 0) {
        for (let j = 1; j <= i; j++) {
          if (String(hashtags[i]).toLowerCase() === String(hashtags[i - j]).toLowerCase()) {
            hashtagInput.setCustomValidity(`Хэштеги не должны повторяться.`);
          }
        }
      } else {
        hashtagInput.setCustomValidity(``);
      }
    }
    hashtagInput.reportValidity();
  };

  const onHashtagInputSubmit = (evt) => {
    if (!hashtagInput.validity.valid) {
      evt.preventDefault();
    }
  };
  window.validation = {
    onHashtagInput: onHashtagInputInput,
    onHashtagSubmit: onHashtagInputSubmit
  };
})();
