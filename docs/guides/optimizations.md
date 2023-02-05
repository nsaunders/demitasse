# ☕ Optimizations

Although we recommend build-time CSS extraction (i.e. generating a `.css` file), Demitasse still depends on the source style sheet at runtime in order to parse its class names and IDs. Thus the CSS source is essentially duplicated, appearing once in the static CSS output and again in the JavaScript bundle where the `cssBindings` function is applied to it. At a small scale, this is unlikely to affect performance noticeably; but, at a larger scale, saving bytes becomes increasingly important.
