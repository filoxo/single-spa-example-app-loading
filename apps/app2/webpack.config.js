const { createConfig } = require("config/@example-webpack.config");

module.exports = createConfig({
  devServer: {
    port: 9002,
  },
});
