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
    app: path.resolve(__dirname, "src", "main"),
  },
  output: {
    publicPath: "",
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
    extensions: [".js", ".ts"],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        resourceQuery: /css/,
        use: [
          "style-loader",
          "css-loader",
          "postcss-loader",
          "execute-module-loader?export=css",
        ],
      },
      {
        test: /\.ts$/,
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
    ],
  },
  optimization: {
    minimizer: ["...", new CssMinimizerPlugin()],
  },
});
