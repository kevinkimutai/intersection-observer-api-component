const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserJSPlugin = require("terser-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { WebpackManifestPlugin } = require("webpack-manifest-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const mode = "development";

module.exports = {
  watch: false,
  mode: mode,
  entry: {
    application: "./src/js/index.js",
  },
  devtool: "eval-cheap-module-source-map",
  output: {
    filename: mode === "production" ? "[name]-[contenthash].js" : "[name].js",
    path: path.resolve(__dirname, "build"),
    assetModuleFilename: "images/[hash][ext][query]",
  },

  optimization: {
    minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
  },

  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.css$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            // options: {
            //   hmr: true,
            // },
          },
          "css-loader",
          "postcss-loader",
        ],
      },
      {
        test: /\.scss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            // options: {
            //   hmr: true,
            // },
          },
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.(png|jpg|gif)$/i,
        type: "asset",
        // use: [
        //   //
        //   { loader: "image-webpack-loader" },
        // ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
    new CleanWebpackPlugin(),
    new WebpackManifestPlugin(),
    new MiniCssExtractPlugin({
      filename:
        mode === "production" ? "[name]-[contenthash].css" : "[name].css",
    }),
  ],
  devServer: {
    port: 9000,
    contentBase: path.resolve(__dirname, "build"),
    hot: true,
    overlay: true,
  },
};
