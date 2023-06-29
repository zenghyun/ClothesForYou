var path = require("path");
var webpack = require("webpack");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: "production",
  entry: {
    main: "./js/index/app.js",
    additional: [
      "./js/index/choiceTip.js",
      "./js/index/clothesSlider.js",
      "./js/index/getYoutube.js",
      "./js/index/scroll.js",
    ],
    myClothes: [
        "./js/myClothes/app.js",
        "./js/myClothes/colorSet.js",
        "./js/myClothes/scroll.js",
        "./js/myClothes/uploadImage.js",
      ],
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|pages)/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/,
        use: [{ loader: "style-loader" }, { loader: "css-loader" }],
      },
      {
        test: /\.scss$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" },
          { loader: "sass-loader" },
        ],
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        loader: "file-loader",
        options: {
          name: "[name].[ext]",
          outputPath: "./images",
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./index.html", 
      excludeChunks: ["myClothes"], // myClothes.js를 index.html에 적용하지 않음
    }),
    new HtmlWebpackPlugin({
      filename: "views/myClothes.html",
      template: "./views/myClothes.html",
      chunks: ["myClothes"], // myClothes.js와 연결
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: "css", to: "css" },
        { from: "scss", to: "scss" },
        { from: "images", to: "images"},
        { from: "images", to: "images"},
        { from: "font", to: "font"},
      ],
    }),
  ],
};
