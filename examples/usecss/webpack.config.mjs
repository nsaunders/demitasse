import path from "path";
import { fileURLToPath } from "url";
import HtmlPlugin from "html-webpack-plugin";
import webpack from "webpack";

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
    new webpack.DefinePlugin({
      process: JSON.stringify({ argv: [], env: {} }),
    }),
    new HtmlPlugin({ title: "Demitasse example" }),
  ],
  resolve: {
    extensions: [".js", ".ts", ".tsx"],
    fallback: {
      path: false,
    },
  },
  module: {
    rules: [
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
    ],
  },
});
