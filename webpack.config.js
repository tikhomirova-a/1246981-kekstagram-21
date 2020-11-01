const path = require ("path");

module.exports = {
  entry: [
    "./js/util.js",
    "./js/main.js",
    "./js/load.js",
    "./js/thumbnails.js",
    "./js/debounce.js",
    "./js/filter.js",
    "./js/preview.js",
    "./js/render.js",
    "./js/picture.js",
    "./js/validation.js",
    "./js/scale.js",
    "./js/effect",
    "./js/upload",
    "./js/image-uploading"
  ],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname),
    iife: true
  },
  devtool: false
};
