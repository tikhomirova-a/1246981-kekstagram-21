'use strict';
const URL_NUMBER_MIN = 1;
const URL_NUMBER_MAX = 25;
const URL_LIKES_MIN = 1;
const URL_LIKES_MAX = 255;
const POSTS_AMOUNT = 25;
const AVATAR_NUMBER_MIN = 1;
const AVATAR_NUMBER_MAX = 6;
// const COMMENT_NUMBER_MIN = 0;
const COMMENT_NUMBER_MAX = 5;
const COMMENT_AUTHOR_MIN = 0;
const COMMENT_AUTHOR_MAX = 5;
const COMMENTS_AMOUNT_MAX = 10;
const COMMENTS_AMOUNT_MIN = 0;
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

const generateRandom = (min = 0, max, arr) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  let result = Math.floor(Math.random() * (max - min + 1)) + min;
  if (arr) {
    return arr[result];
  } else {
    return result;
  }
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

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

const generateNonRepeatingRandom = (numbers) => {
  const numberId = getRandomInt(numbers.length);
  return numbers.splice(numberId, 1);
};

const createComments = () => {
  let comments = [];
  for (let i = 0; i < COMMENTS_AMOUNT_MAX; i++) {
    const comment = (function () {
      return {
        avatar: `img/avatar-${generateRandom(AVATAR_NUMBER_MIN, AVATAR_NUMBER_MAX)}.svg`,
        message: generateRandom(0, COMMENT_NUMBER_MAX, COMMENT_PHRASES),
        name: generateRandom(COMMENT_AUTHOR_MIN, COMMENT_AUTHOR_MAX, COMMENT_AUTHOR_NAMES)
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
    likes: generateRandom(URL_LIKES_MIN, URL_LIKES_MAX),
    comments: createComments().slice(generateRandom(COMMENTS_AMOUNT_MIN, COMMENTS_AMOUNT_MAX))
  };
};

let description = `Красивая фотография, сделанная вчера.`;

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

const bigPicture = document.querySelector(`.big-picture`);
const commentList = bigPicture.querySelector(`.social__comments`);
const body = document.querySelector(`body`);

const renderComments = () => {
  for (let i = 0; i < posts[0].comments.length; i++) {
    const newCommentItem = commentList.querySelector(`.social__comment`).cloneNode(true);
    newCommentItem.querySelector(`img`).src = posts[0].comments[i].avatar;
    newCommentItem.querySelector(`img`).alt = posts[0].comments[i].name;
    newCommentItem.querySelector(`.social__text`).textContent = posts[0].comments[i].message;
    commentList.appendChild(newCommentItem);
  }
  commentList.children[0].remove();
  commentList.children[0].remove();
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

const uploadOpen = document.querySelector(`#upload-file`);
const uploadClose = document.querySelector(`#upload-cancel`);
const uploadedImage = document.querySelector(`.img-upload__overlay`);

const onUploadedImageEscPress = (evt) => {
  if (evt.key === `Escape`) {
    evt.preventDefault();
    closeUploadedImage();
  }
};

const openUploadedImage = () => {
  uploadedImage.classList.remove(`hidden`);
  body.classList.add(`modal-open`);
  document.addEventListener(`keydown`, onUploadedImageEscPress);
  scaleControlSmaller.addEventListener(`click`, onScaleControlSmallerClick);
  scaleControlBigger.addEventListener(`click`, onScaleControlBiggerClick);
};

const closeUploadedImage = () => {
  uploadedImage.classList.add(`hidden`);
  body.classList.remove(`modal-open`);
  document.removeEventListener(`keydown`, onUploadedImageEscPress);
  scaleControlSmaller.removeEventListener(`click`, onScaleControlSmallerClick);
  scaleControlBigger.removeEventListener(`click`, onScaleControlBiggerClick);
  uploadOpen.value = ``;
};

uploadOpen.addEventListener(`change`, function () {
  openUploadedImage();
});

uploadClose.addEventListener(`click`, function () {
  closeUploadedImage();
});

const scaleControlSmaller = uploadedImage.querySelector(`.scale__control--smaller`);
const scaleControlBigger = uploadedImage.querySelector(`.scale__control--bigger`);
const scaleControlInput = uploadedImage.querySelector(`.scale__control--value`);
let scaleSize = Number(scaleControlInput.value.split(`%`)[0]);
const uploadedImagePreview = uploadedImage.querySelector(`.img-upload__preview > img`);

const makeImageBigger = () => {
  if (scaleSize < 100) {
    scaleSize += 25;
    if (scaleSize >= 100) {
      scaleSize = 100;
    }
    scaleControlInput.value = scaleSize + `%`;
  }
};

const makeImageSmaller = () => {
  if (scaleSize > 25) {
    scaleSize -= 25;
    if (scaleSize <= 25) {
      scaleSize = 25;
    }
    scaleControlInput.value = scaleSize + `%`;
  }
};

const changeScale = () => {
  uploadedImagePreview.style.transform = `scale(${scaleSize / 100})`;
};

const onScaleControlBiggerClick = () => {
  makeImageBigger();
  changeScale();
};

const onScaleControlSmallerClick = () => {
  makeImageSmaller();
  changeScale();
};

