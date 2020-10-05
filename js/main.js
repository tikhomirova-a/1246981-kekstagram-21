'use strict';
const URL_NUMBER_MIN = 1;
const URL_NUMBER_MAX = 25;
const URL_LIKES_MIN = 1;
const URL_LIKES_MAX = 255;
const POSTS_AMOUNT = 25;
const AVATAR_NUMBER_MIN = 1;
const AVATAR_NUMBER_MAX = 6;
const COMMENT_NUMBER_MAX = 5;
const COMMENT_AUTHOR_MAX = 5;
const COMMENTS_AMOUNT_MAX = 10;
const COMMENT_PHRASES = [
  `Всё отлично!`,
  `В целом всё неплохо. Но не всё.`,
  `Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.`,
  `Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.`,
  `Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.`,
  `Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!`
];

const COMMENT_AUTHOR_NAMES = [
  `Вера`,
  `Бэла`,
  `Григорий Александрович`,
  `Мэри`,
  `Михаил`,
  `Максим Максимович`
];
const DEFAULT_EFFECT_LEVEL = 100;
const MIN_HASHTAG_LENGTH = 2;
const MAX_HASHTAG_LENGTH = 20;

const generateRandom = (max, min = 0) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

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

const generateNumbers = (min, max) => {
  let numbers = [];
  for (let i = min; i <= max; i++) {
    numbers.push(i);
  }
  shuffle(numbers);
  return numbers;
};

const generateNonRepeatingRandom = (numbers) => {
  const numberId = generateRandom(numbers.length - 1);
  return numbers.splice(numberId, 1);
};

const createComments = () => {
  let comments = [];
  for (let i = 0; i < COMMENTS_AMOUNT_MAX; i++) {
    const comment = (function () {
      return {
        avatar: `img/avatar-${generateRandom(AVATAR_NUMBER_MAX, AVATAR_NUMBER_MIN)}.svg`,
        message: COMMENT_PHRASES[generateRandom(COMMENT_NUMBER_MAX)],
        name: COMMENT_AUTHOR_NAMES[generateRandom(COMMENT_AUTHOR_MAX)]
      };
    })();
    comments.push(comment);
  }
  return comments;
};

const createPost = (description, urlNumbers) => {
  return {
    url: `photos/${generateNonRepeatingRandom(urlNumbers)}.jpg`,
    description: `${description}`,
    likes: generateRandom(URL_LIKES_MAX, URL_LIKES_MIN),
    comments: createComments().slice(generateRandom(COMMENTS_AMOUNT_MAX))
  };
};

const description = `Красивая фотография, сделанная вчера.`;

const posts = (function () {
  const urlNumbers = generateNumbers(URL_NUMBER_MIN, URL_NUMBER_MAX);
  let postElements = [];
  for (let i = 0; i < POSTS_AMOUNT; i++) {
    const post = createPost(description, urlNumbers);
    postElements.push(post);
  }
  return postElements;
})();

const pictureTemplate = document.querySelector(`#picture`).content;

const createPicture = (post) => {
  const picture = pictureTemplate.cloneNode(true);
  picture.querySelector(`.picture__img`).src = post.url;
  picture.querySelector(`.picture__likes`).textContent = post.likes;
  picture.querySelector(`.picture__comments`).textContent = post.comments.length;
  return picture;
};

const fragment = document.createDocumentFragment();
for (let i = 0; i < posts.length; i++) {
  fragment.appendChild(createPicture(posts[i]));
}
const picturesSection = document.querySelector(`.pictures`);
picturesSection.appendChild(fragment);

const thumbnailPictures = document.querySelectorAll(`.picture`);
const bigPicture = document.querySelector(`.big-picture`);
const commentList = bigPicture.querySelector(`.social__comments`);
const body = document.querySelector(`body`);

const renderComments = () => {
  const commentItem = commentList.querySelector(`.social__comment`).cloneNode(true);
  while (commentList.firstChild) {
    commentList.removeChild(commentList.firstChild);
  }
  for (let i = 0; i < posts[0].comments.length; i++) {
    const newCommentItem = commentItem.cloneNode(true);
    newCommentItem.querySelector(`img`).src = posts[0].comments[i].avatar;
    newCommentItem.querySelector(`img`).alt = posts[0].comments[i].name;
    newCommentItem.querySelector(`.social__text`).textContent = posts[0].comments[i].message;
    commentList.appendChild(newCommentItem);
  }
  return commentList;
};

const showPicture = () => {
  bigPicture.classList.remove(`hidden`);

  bigPicture.querySelector(`.big-picture__img > img`).src = posts[0].url;
  bigPicture.querySelector(`.likes-count`).textContent = posts[0].likes;
  bigPicture.querySelector(`.comments-count`).textContent = posts[0].comments.length;
  bigPicture.querySelector(`.social__caption`).textContent = posts[0].description;
  renderComments();
  bigPicture.querySelector(`.social__comment-count`).classList.add(`hidden`);
  bigPicture.querySelector(`.comments-loader`).classList.add(`hidden`);
  body.classList.add(`.modal-open`);
};

const onThumbnailPictureClick = () => {
  showPicture();
};

for (let i = 0; i < thumbnailPictures.length; i++) {
  thumbnailPictures[i].addEventListener(`click`, onThumbnailPictureClick);
}

const uploadImageForm = document.querySelector(`.img-upload__form`);
const uploadOpen = uploadImageForm.querySelector(`#upload-file`);
const uploadedImage = uploadImageForm.querySelector(`.img-upload__overlay`);
const uploadClose = uploadedImage.querySelector(`#upload-cancel`);

const onUploadedImageEscPress = (evt) => {
  if (evt.key === `Escape` && document.activeElement !== hashtagInput) {
    evt.preventDefault();
    closeUploadedImage();
  }
};

const openUploadedImage = () => {
  uploadedImage.classList.remove(`hidden`);
  body.classList.add(`modal-open`);
  document.addEventListener(`keydown`, onUploadedImageEscPress);
  uploadImageForm.addEventListener(`click`, onScaleControlClick);
  uploadedImage.addEventListener(`change`, onEffectInputChange);
  hashtagInput.addEventListener(`input`, onHashtagInputInput);
  hashtagInput.addEventListener(`submit`, onHashtagInputSubmit);
};

const closeUploadedImage = () => {
  uploadedImage.classList.add(`hidden`);
  body.classList.remove(`modal-open`);
  document.removeEventListener(`keydown`, onUploadedImageEscPress);
  uploadImageForm.removeEventListener(`click`, onScaleControlClick);
  uploadedImage.removeEventListener(`change`, onEffectInputChange);
  hashtagInput.removeEventListener(`input`, onHashtagInputInput);
  hashtagInput.removeEventListener(`submit`, onHashtagInputSubmit);
  uploadOpen.value = ``;
};

const onUploadCloseClick = () => {
  closeUploadedImage();
  uploadClose.removeEventListener(`click`, onUploadCloseClick);
};

uploadOpen.addEventListener(`change`, function () {
  openUploadedImage();
  uploadClose.addEventListener(`click`, onUploadCloseClick);
});

const scaleControlSmaller = uploadedImage.querySelector(`.scale__control--smaller`);
const scaleControlBigger = uploadedImage.querySelector(`.scale__control--bigger`);
const scaleControlInput = uploadedImage.querySelector(`.scale__control--value`);
let scaleSize = Number(scaleControlInput.value.split(`%`)[0]);
const uploadedImagePreview = uploadedImage.querySelector(`.img-upload__preview > img`);


const changeScale = () => {
  uploadedImagePreview.style.transform = `scale(${scaleSize / 100})`;
};

const onScaleControlClick = (evt) => {
  if (evt.target === scaleControlBigger) {
    if (scaleSize < 100) {
      scaleSize += 25;
    } else {
      scaleSize = 100;
    }
  } else if (evt.target === scaleControlSmaller) {
    if (scaleSize > 25) {
      scaleSize -= 25;
    } else {
      scaleSize = 25;
    }
  }
  scaleControlInput.value = scaleSize + `%`;
  changeScale();
};

const effectPin = uploadedImage.querySelector(`.effect-level__pin`);
const effectLevelInput = uploadedImage.querySelector(`.effect-level__value`);

const calculateEffectLevel = () => {
  effectLevelInput.value = Math.round(effectPin.offsetLeft / effectPin.offsetParent.offsetWidth * 100);
  return Number(effectLevelInput.value);
};

const applyEffectLevel = () => {
  if (uploadedImagePreview.classList.contains(`effects__preview--chrome`)) {
    uploadedImagePreview.style.filter = `grayscale(${calculateEffectLevel() / 100})`;
  } else if (uploadedImagePreview.classList.contains(`effects__preview--sepia`)) {
    uploadedImagePreview.style.filter = `sepia(${calculateEffectLevel() / 100})`;
  } else if (uploadedImagePreview.classList.contains(`effects__preview--marvin`)) {
    uploadedImagePreview.style.filter = `invert(${calculateEffectLevel()}%)`;
  } else if (uploadedImagePreview.classList.contains(`effects__preview--phobos`)) {
    uploadedImagePreview.style.filter = `blur(${calculateEffectLevel() * 3 / 100}px)`;
  } else if (uploadedImagePreview.classList.contains(`effects__preview--heat`)) {
    uploadedImagePreview.style.filter = `brightness(${1 + 0.02 * calculateEffectLevel()})`;
  }
};

effectPin.addEventListener(`mouseup`, function () {
  calculateEffectLevel();
  applyEffectLevel();
});

const resetEffectLevel = () => {
  effectLevelInput.value = DEFAULT_EFFECT_LEVEL;
  if (!uploadedImagePreview.classList.contains(`effects__preview--^`)) {
    uploadedImagePreview.style.filter = ``;
  }
};

const effectSlider = uploadedImage.querySelector(`.effect-level`);

const onEffectInputChange = (evt) => {
  if (evt.target && evt.target.matches(`input[type='radio']`)) {
    uploadedImagePreview.className = ``;
    resetEffectLevel();
    if (evt.target.value !== `none`) {
      effectSlider.classList.remove(`hidden`);
      uploadedImagePreview.classList.add(`effects__preview--${evt.target.value}`);
    } else {
      effectSlider.classList.add(`hidden`);
    }
  }
};

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
