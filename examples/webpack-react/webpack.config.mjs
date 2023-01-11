import path from "path";
import { fileURLToPath } from "url";
import CssMinimizerPlugin from "css-minimizer-webpack-plugin";
import HtmlPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import autoprefixer from "autoprefixer";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default ({ production }) => ({
  mode: production ? "production" : "development",
  devtool: production ? "source-map" : "inline-source-map",
  entry: {
    app: path.resolve(__dirname, "src", "main"),
  },
  output: {
    path: path.resolve(__dirname, "public"),
    filename: `[name]${production ? ".[contenthash]" : ""}.js`,
  },
  plugins: [
    new HtmlPlugin({ title: "Demitasse example" }),
    new MiniCssExtractPlugin({
      filename: `[name]${production ? ".[contenthash]" : ""}.css`,
    }),
  ],
  resolve: {
    extensions: [".js", ".ts", ".tsx", ".css"],
    fallback: {
      path: false,
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx$/,
        resourceQuery: /css/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          path.resolve(__dirname, "component-css-loader.js"),
          {
            loader: "execute-module-loader",
            options: {
              getResult({ cssContext, css }) {
                return JSON.stringify({ cssContext, css });
              },
            },
          },
        ],
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "ts-loader",
          options: {
            compilerOptions: {
              noEmit: false,
            },
          },
        },
      },
      {
        test: /\.woff2?$/,
        type: "asset/resource",
      },
    ],
  },
  devServer: {
    hot: false,
  },
  optimization: {
    minimizer: [
      "...",
      new CssMinimizerPlugin(),
    ],
  },
});
