const HtmlPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const VirtualModulesPlugin = require("webpack-virtual-modules");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");

module.exports = ({ production }) => ({
  mode: production ? "production" : "development",
  devtool: false,
  entry: ["./src/main", "./src/styles"],
  resolve: {
    extensions: [".css", ".ts", ".tsx", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader"
      },
      {
        test: /\/styles\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  autoprefixer(),
                  ...production ? [cssnano()] : [],
                ],
              },
            },
          },
          "val-loader",
        ],
      },
    ],
  },
  plugins: [
    new HtmlPlugin({ title: "Webpack Example" }),
    new VirtualModulesPlugin({
      "./src/styles.css": `
        if (!(".ts" in require.extensions)) { // [1]
          require("ts-node").register({
            transpileOnly: true, // [2]
            compilerOptions: {
              module: "commonjs", // [3]
            },
          });
        }

        require("demitasse").css = require("demitasse/extract").css; // [4]

        const stylesPath = require.resolve("./styles.ts");

        module.exports = () => {
          const code = // [5]
            Object
              .values(require(stylesPath))
              .flatMap(x => {
                switch (typeof x) { // [6]
                  case "object": // [7]
                    return Object.values(x);
                  case "string":
                    return [x];
                  default:
                    return [];
                }
              })
              .join("\\n");

          const dependencies = // [8]
            module
              .children
              .filter(({ filename }) => filename.endsWith("/styles.ts"))
              .flatMap(({ children }) => children)
              .map(({ filename }) => filename)
              .concat(stylesPath);

          dependencies.forEach(key => {
            delete require.cache[key]; // [9]
          });

          return { code, dependencies };

        };

        /*
        1. ts-node should be registered once, if *.ts files aren't already in
           the list of supported "require" extensions.
        2. Type-checking is most likely redundant in this context.
        3. CommonJS is the module required in the remainder of the script.
        4. Redirect css function calls to the demitasse/extract module, which
           produces CSS code instead of class names.
        5. Gather CSS code from the style index. The Object.values function is
           used because the keys in the style index aren't relevant when
           producing a CSS file for an entire app. (The keys may be relevant,
           however, when building a component library: They can be used for
           filenames in a CSS-file-per-component model, as demonstrated in the
           "basic" example.
        6. Because of how the style index is structured, each value may
           constitute a single ruleset or multiple. It is possible to
           structure the style index differently if you would prefer to
           move this bit of complexity elsewhere.
        7. x would be an object when using the multiple-ruleset css
           API, explained in the demitasse README. At runtime, the
           keys map to generated class names. However, the generated
           class names aren't relevant here, hence the use of
           Object.values to strip them away.
        8. The dependencies consist of all of the modules contributing to the
           code produced by this script. These are required by val-loader, as
           well as for cache invalidation.
        9. It is necessary to remove the dependencies from the Node.js require
           cache; otherwise, style changes won't be reflected in the next
           build (for example, when using the webpack development server or
           otherwise in watch mode).
        */
      `,
    }),
    new MiniCssExtractPlugin(),
  ],
});
