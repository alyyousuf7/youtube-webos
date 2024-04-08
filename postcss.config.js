const autoprefixer = require('autoprefixer');
const postcssPresetEnv = require('postcss-preset-env');
const postcssSafeImportant = require('postcss-safe-important');
const tailwindcss = require('tailwindcss');

/** @type {import('postcss-load-config').Config} */
module.exports = {
  map: false,
  plugins: [
    tailwindcss(),
    autoprefixer(),
    postcssPresetEnv(),
    // See `tailwind.config.mjs` for more information.
    postcssSafeImportant({
      excludeSelectors: /\.tw-preflight/,
    }),
  ],
};
