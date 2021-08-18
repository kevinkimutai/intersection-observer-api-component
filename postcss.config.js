const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  plugins: [
    require("postcss-preset-env")({
      browsers: "last 3 versions",
    }),
  ],
};
