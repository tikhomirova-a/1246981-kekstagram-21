'use strict';
const URL_NUMBER_MIN = 1;
const URL_NUMBER_MAX = 25;
const URL_LIKES_MIN = 1;
const URL_LIKES_MAX = 255;
const POSTS_AMOUNT = 25;
const AVATAR_NUMBER_MIN = 1;
const AVATAR_NUMBER_MAX = 6;
const COMMENT_NUMBER_MIN = 0;
const COMMENT_NUMBER_MAX = 5;
const COMMENT_AUTHOR_MIN = 0;
const COMMENT_AUTHOR_MAX = 5;
const COMMENTS_AMOUNT_MAX = 10;
const COMMENTS_AMOUNT_MIN = 0;

const generateRandom = (min, max, arr) => {
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

const generateNonRepeatingRandom = (numbers) => {
  const randomNumber = numbers.splice(POSTS_AMOUNT - numbers.length, (POSTS_AMOUNT - numbers.length) + 1);
  return randomNumber;
};

const commentPhrases = [
  `Всё отлично!`,
  `В целом всё неплохо. Но не всё.`,
  `Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.`,
  `Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.`,
  `Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.`,
  `Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!`
];

const commentAuthorNames = [
  `Вера`,
  `Бэла`,
  `Григорий Александрович`,
  `Мэри`,
  `Михаил`,
  `Максим Максимович`
];

const createComment = () => {
  const avatarNumber = generateRandom(AVATAR_NUMBER_MIN, AVATAR_NUMBER_MAX);
  const commentText = generateRandom(COMMENT_NUMBER_MIN, COMMENT_NUMBER_MAX, commentPhrases);
  const commentAuthor = generateRandom(COMMENT_AUTHOR_MIN, COMMENT_AUTHOR_MAX, commentAuthorNames);
  const comment = {
    avatar: `img/avatar-${avatarNumber}.svg`,
    message: `${commentText}`,
    name: `${commentAuthor}`
  };
  return comment;
};

const createCommentsArray = () => {
  let comments = [];
  for (let i = 0; i < COMMENTS_AMOUNT_MAX; i++) {
    const comment = createComment();
    comments.push(comment);
  }
  return comments;
};

const createPost = (description) => {
  const post = {};
  const urlNumbers = generateNumbers(URL_NUMBER_MIN, URL_NUMBER_MAX);
  const urlNumber = generateNonRepeatingRandom(urlNumbers);
  const likesNumber = generateRandom(URL_LIKES_MIN, URL_LIKES_MAX);
  post.url = `photos/${urlNumber}.jpg`;
  post.description = `${description}`;
  post.likes = likesNumber;
  post.comments = createCommentsArray();
  return post;
};

let postsArray = [];
const createPostsArray = (description) => {
  for (let i = 0; i < POSTS_AMOUNT; i++) {
    const post = createPost(description);
    postsArray.push(post);
  }
  return postsArray;
};

postsArray = createPostsArray(`Красивая фотография этого утра.`);

const pictureTemplate = document.querySelector(`#picture`).content;

const createPicture = (post) => {
  const picture = pictureTemplate.cloneNode(true);
  picture.querySelector(`.picture__img`).src = post.url;
  picture.querySelector(`.picture__likes`).textContent = post.likes;
  picture.querySelector(`.picture__comments`).textContent = generateRandom(COMMENTS_AMOUNT_MIN, COMMENTS_AMOUNT_MAX);
  return picture;
};

const fragment = document.createDocumentFragment();
for (let i = 0; i < postsArray.length; i++) {
  fragment.appendChild(createPicture(postsArray[i]));
}
const picturesSection = document.querySelector(`.pictures`);
picturesSection.appendChild(fragment);
