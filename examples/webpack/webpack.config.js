const HtmlPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = ({ production }) => ({
  mode: production ? "production" : "development",
  devtool: false,
  entry: [
    "./src/index.ts",
    "./src/styles.css.js",
  ],
  resolve: {
    extensions: [".css", ".ts", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader"
      },
      {
        test: /\/styles\.css\.js$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "val-loader",
        ],
      },
    ],
  },
  plugins: [
    new HtmlPlugin({ title: "Liger" }),
    new MiniCssExtractPlugin(),
  ],
});
