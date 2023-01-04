import postcss from "postcss";
import autoprefixer from "autoprefixer";
import prefixer from "postcss-prefixer";
import prefixKeyframe from "postcss-prefix-keyframe";
import overrideBrowserslist from "../.browserslistrc";

import * as App from "./components/App";
import * as Button from "./components/Button";

export default [
  App,
  Button,
]
  .map(({ cssContext, css }) =>
    postcss([
      autoprefixer({ overrideBrowserslist }),
      prefixer({ prefix: `${cssContext}___` }),
      prefixKeyframe({ prefix: `${cssContext}___` }),
    ])
    .process(css)
  )
  .join("\n\n");
