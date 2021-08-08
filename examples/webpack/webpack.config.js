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
        if (!(".ts" in require.extensions)) {
          require("ts-node").register({
            transpileOnly: true,
            compilerOptions: {
              module: "commonjs",
            },
          });
        }

        require("demitasse").css = require("demitasse/extract").css;

        const stylesPath = require.resolve("./styles.ts");

        module.exports = () => {
          const code =
            Object
              .values(require(stylesPath))
              .flatMap(x => {
                switch (typeof x) {
                  case "object":
                    return Object.values(x);
                  case "string":
                    return [x];
                  default:
                    return [];
                }
              })
              .join("\\n");

          const dependencies =
            module
              .children
              .filter(({ filename }) => filename.endsWith("/styles.ts"))
              .flatMap(({ children }) => children)
              .map(({ filename }) => filename)
              .concat(stylesPath);

          dependencies.forEach(key => {
            delete require.cache[key];
          });

          return { code, dependencies };
        };
      `,
    }),
    new MiniCssExtractPlugin(),
  ],
});
