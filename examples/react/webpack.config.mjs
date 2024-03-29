import path from "path";
import { fileURLToPath } from "url";
import CssMinimizerPlugin from "css-minimizer-webpack-plugin";
import ForkTSCheckerPlugin from "fork-ts-checker-webpack-plugin";
import HtmlPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default ({ production }) => ({
  mode: production ? "production" : "development",
  devtool: production ? "source-map" : "inline-source-map",
  entry: {
    app: path.resolve(__dirname, "src", "main"),
  },
  output: {
    publicPath: "",
    path: path.resolve(__dirname, "public"),
    filename: `[name]${production ? ".[contenthash]" : ""}.js`,
  },
  plugins: [
    new ForkTSCheckerPlugin({
      typescript: {
        diagnosticOptions: {
          semantic: true,
          syntactic: true,
        },
      },
    }),
    new HtmlPlugin({ title: "Demitasse example" }),
    new MiniCssExtractPlugin({
      filename: `[name]${production ? ".[contenthash]" : ""}.css`,
    }),
  ],
  resolve: {
    extensions: [".js", ".ts", ".tsx"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        resourceQuery: { not: /css/ },
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            babelrc: false,
            configFile: false,
            presets: [["@babel/env", { useBuiltIns: "usage", corejs: "3.27" }]],
            plugins: production ? ["babel-plugin-template-css-minifier"] : [],
          },
        },
      },
      {
        test: /\.tsx$/,
        resourceQuery: /css/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "component-css-loader",
          "execute-module-loader?module",
        ],
      },
      {
        test: /\.tsx$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            babelrc: false,
            configFile: false,
            presets: [["@babel/react", { runtime: "automatic" }]],
          },
        },
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            babelrc: false,
            configFile: false,
            presets: ["@babel/typescript"],
          },
        },
      },
    ],
  },
  optimization: {
    minimizer: ["...", new CssMinimizerPlugin()],
  },
});
