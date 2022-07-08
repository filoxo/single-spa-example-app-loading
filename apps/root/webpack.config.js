const {
  createConfig,
  mergeWithCustomize,
  unique,
} = require("config/@example-webpack.config");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = createConfig(
  (env, argv) => {
    const config = {
      plugins: [
        new HtmlWebpackPlugin({
          inject: false,
          template: "src/index.ejs",
          templateParameters: {
            isLocal: env && env.isLocal,
          },
        }),
      ],
      devServer: {
        onListening: ({ compiler }) => {
          const { https, host, port } = compiler.options.devServer;
          const protocol = !https ? "http://" : "https://";
          const portUrl = !port ? "" : `:${port}`;
          console.log(
            `⚡️ single-spa root url: ${protocol}${host}${portUrl}/\n`
          );
          // TODO: copy this URL to clipboard
        },
      },
    };

    return config;
  },
  mergeWithCustomize({
    customizeArray: unique(
      "plugins",
      ["HtmlWebpackPlugin"],
      (plugin) => plugin.constructor && plugin.constructor.name
    ),
  })
);
