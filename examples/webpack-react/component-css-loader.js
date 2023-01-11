const postcssLoader = require("postcss-loader");
const prefixer = require("postcss-prefixer");
const prefixKeyframe = require("postcss-prefix-keyframe");
const { validate } = require("schema-utils");

module.exports = function componentCSSLoader(content, ...args) {
  const json = JSON.parse(content);
  validate({
    title: "component-css-loader CSS",
    type: "object",
    required: ["cssContext", "css"],
    properties: {
      cssContext: { type: "string" },
      css: { type: "string" },
    },
  }, json);
  const { cssContext, css } = json;
  return postcssLoader.apply(
    {
      ...this,
      getOptions: () => ({
        postcssOptions: {
          plugins: [
            prefixer({ prefix: `${cssContext}___` }),
            prefixKeyframe({ prefix: `${cssContext}___` }),
          ],
        },
      }),
    },
    [css, ...args],
  );
};
