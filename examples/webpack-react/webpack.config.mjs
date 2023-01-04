import path from "path";
import { fileURLToPath } from "url";
import CssMinimizerPlugin from "css-minimizer-webpack-plugin";
import HtmlPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default ({ production }) => ({
  mode: production ? "production" : "development",
  devtool: production ? "source-map" : "inline-source-map",
  entry: {
    app: path.resolve(__dirname, "src"),
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
        test: /\.browserslistrc$/,
        type: "asset/source",      
      },
      {
        test: /src\/css\.ts$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "execute-module-loader",
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
  watchOptions: {
    aggregateTimeout: 500,
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
