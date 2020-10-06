'use strict';
(function () {
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
  const DESCRIPTION = `Красивая фотография, сделанная вчера.`;
  const URL_LIKES_MIN = 1;
  const URL_LIKES_MAX = 255;
  const URL_NUMBER_MIN = 1;
  const URL_NUMBER_MAX = 25;
  const POSTS_AMOUNT = 25;
  const createComments = () => {
    let comments = [];
    for (let i = 0; i < COMMENTS_AMOUNT_MAX; i++) {
      const comment = (function () {
        return {
          avatar: `img/avatar-${window.numberGenerator.generateRandom(AVATAR_NUMBER_MAX, AVATAR_NUMBER_MIN)}.svg`,
          message: COMMENT_PHRASES[window.numberGenerator.generateRandom(COMMENT_NUMBER_MAX)],
          name: COMMENT_AUTHOR_NAMES[window.numberGenerator.generateRandom(COMMENT_AUTHOR_MAX)]
        };
      })();
      comments.push(comment);
    }
    return comments;
  };
  const createPost = (description, urlNumbers) => {
    return {
      url: `photos/${window.numberGenerator.generateNonRepeatingRandom(urlNumbers)}.jpg`,
      description: `${description}`,
      likes: window.numberGenerator.generateRandom(URL_LIKES_MAX, URL_LIKES_MIN),
      comments: createComments().slice(window.numberGenerator.generateRandom(COMMENTS_AMOUNT_MAX))
    };
  };
  const posts = (function () {
    const urlNumbers = window.numberGenerator.generateNumbers(URL_NUMBER_MIN, URL_NUMBER_MAX);
    let postElements = [];
    for (let i = 0; i < POSTS_AMOUNT; i++) {
      const post = createPost(DESCRIPTION, urlNumbers);
      postElements.push(post);
    }
    return postElements;
  })();
  window.data = {
    posts
  };
})();
