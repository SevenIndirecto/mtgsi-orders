const createResolver = require('postcss-import-resolver');
const path = require('path');

const srcDir = path.join(__dirname, 'src');
const rootDir = __dirname;

module.exports = {
  plugins: {
    // https://github.com/postcss/postcss-import
    'postcss-import': {
      // With current settings required to use "./" in css files (eg. @import "./_variables.css")
      resolve: createResolver({
        alias: {
          '~': srcDir,
          '~~': rootDir,
          '@': srcDir,
          '@@': rootDir,
        },
        modules: [srcDir, rootDir],
      }),
    },
    // https://github.com/postcss/postcss-url
    'postcss-url': {},
    // https://github.com/postcss/postcss-nested
    // Works better for forming BEM class names than postscss-nesting
    'postcss-nested': {},
    'postcss-css-variables': {},
    // 'postcss-hexrgba': {},
    // https://github.com/csstools/postcss-preset-env
    'postcss-preset-env': {
      stage: 3,
      features: {
        'custom-media-queries': true,
      },
    },
  },
};
