'use strict';

const DEBOUNCE_INTERVAL_MS = 500;

const debounce = (cb) => {
  let lastTimeout = null;

  return function (...args) {
    const parameters = args;
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(() => {
      cb(...parameters);
    }, DEBOUNCE_INTERVAL_MS);
  };
};
window.debounce = {
  debounce
};
