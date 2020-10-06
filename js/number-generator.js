'use strict';
(function () {
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

  window.numberGenerator = {
    generateRandom,
    generateNumbers,
    generateNonRepeatingRandom
  };
})();
