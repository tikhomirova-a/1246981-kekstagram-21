'use strict';

const MIN_HASHTAG_LENGTH = 2;
const MAX_HASHTAG_LENGTH = 20;
const MAX_COMMENT_LENGTH = 140;

const onHashtagInputInput = () => {
  const hashtags = window.main.hashtagInput.value.split(` `);
  if (window.main.hashtagInput.value !== ``) {
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
  } else {
    window.main.hashtagInput.setCustomValidity(``);
  }
  window.main.hashtagInput.reportValidity();
  if (!window.main.hashtagInput.validity.valid) {
    window.main.hashtagInput.style.border = `2px solid red`;
    window.main.hashtagInput.style.outlineOffset = `2px`;
  } else {
    window.main.hashtagInput.style = ``;
  }
};

const onFormInputSubmit = (evt) => {
  if (!window.main.hashtagInput.validity.valid || !window.main.commentInput.validity.valid) {
    evt.preventDefault();
  }
};

const onCommentInputInput = () => {
  if (window.main.commentInput.value.length > MAX_COMMENT_LENGTH) {
    window.main.commentInput.setCustomValidity(`Длина комментария не может составлять больше ${MAX_COMMENT_LENGTH} символов.`);
    window.main.commentInput.style.border = `2px solid red`;
    window.main.hashtagInput.style.outlineOffset = `2px`;
  } else {
    window.main.commentInput.setCustomValidity(``);
    window.main.commentInput.style = ``;
  }
  window.main.commentInput.reportValidity();
};
window.validation = {
  onHashtagInputInput,
  onFormInputSubmit,
  onCommentInputInput
};
