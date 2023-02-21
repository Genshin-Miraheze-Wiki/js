const path = require("path");

const BannerPlugin = require("./plugins/BannerPlugin");

module.exports = {
  entry: "./app.js",
  mode: "production",
  //target: ["web", "es5"],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "output.bundle.js",
    clean: true,
  },
  plugins: [
    new BannerPlugin({
      banner:
        "/*All original source code is available under the MPL-2.0 license and others at https://github.com/Genshin-Miraheze-Wiki/js. Compiled text is available under the Creative Commons license CC-BY-SA 4.0 unless noted otherwise.*/",
    }),
  ],
};
