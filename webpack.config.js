const BannerPlugin = require("./plugins/BannerPlugin");
const path = require("path");

module.exports = {
  entry: "./app.js",
  mode: "production",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "output.bundle.js",
    clean: true,
  },
  plugins: [
    new BannerPlugin({
      banner:
        "/*Source code is available under the MPL-2.0 license and others at https://github.com/Genshin-Miraheze-Wiki/js. Compiled text is available under the Creative Commons license CC-BY-SA 4.0.*/",
      raw: false,
    }),
  ],
};
