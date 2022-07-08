const singleSpaDefaults = require("webpack-config-single-spa");
const {
  merge,
  mergeWithRules,
  mergeWithCustomize,
  unique,
} = require("webpack-merge");
const path = require("path");
const filenamify = require("filenamify");
const packageJson = require(path.resolve(process.cwd(), "package.json"));

/*
Opinionated webpack config for my @example org.
At some point, orgs get large enough that consistency with configs can be very helpful
as not everyone needs to be experts in webpack/build configs, 
while still allowing for customization as needed.

Copying over the config values you want and extending from there intead of reusing the
single-spa configs is definitely a valid approach. I'm reusing it here to demonstrate 
how to extend the base single-spa config.
*/
const baseConfig = (env, argv) => {
  if (!packageJson.main)
    throw new Error('package.json must have a "main" field');
  if (!packageJson.name)
    throw new Error('package.json must have a "name" field');

  const defaultConfig = singleSpaDefaults({
    orgName: "example", // company name/scope that apps shouldn't need to worry about since its here
    projectName: packageJson.name,
    webpackConfigEnv: env,
    argv,
    disableHtmlGeneration: true,
  });
  const port = env.port || 9000;

  // prefer using package.json convention of main field
  // https://docs.npmjs.com/cli/v8/configuring-npm/package-json#main
  const entry = path.resolve(process.cwd(), packageJson.main);
  // prefer using package.json convention of project name field
  // https://docs.npmjs.com/cli/v8/configuring-npm/package-json#name
  const filename = `${filenamify(packageJson.name, { replacement: "-" })}.js`;

  const orgConfig = merge(defaultConfig, {
    entry,
    output: {
      filename,
      uniqueName: packageJson.name,
      devtoolNamespace: packageJson.name,
    },
    externals: ["react", "react-dom"],
    devServer: {
      host: "localhost",
      port,
      onListening: ({ compiler }) => {
        const { https, host, port } = compiler.options.devServer;
        const { publicPath, filename } = compiler.options.output;
        const protocol = https ? "https://" : "http://";
        const portUrl = !port ? "" : `:${port}`;
        const path = ["", "auto"].includes(publicPath) ? "/" : publicPath;
        console.log(
          `\n⚡️ single-spa entry url: ${protocol}${host}${portUrl}${path}${filename}\n`
        );
        // TODO: copy this URL to clipboard
      },
    },
  });

  return orgConfig;
};

const createConfig = (appConfig, mergeStrategy = merge) => {
  return function (env, argv) {
    // webpack-merged no longer supports merging webpack config functions
    // so we must preevaluate them
    const evaldBaseConfig = baseConfig(env, argv);
    const evaldAppConfig =
      typeof appConfig === "function" ? appConfig(env, argv) : appConfig;

    const config = mergeStrategy(evaldBaseConfig, evaldAppConfig);
    // for debugging
    // console.dir(config, { depth: null });
    return config;
  };
};

module.exports = {
  createConfig,
  /*
  exporting these so that apps don't need to install on their own or try to 
  use another lib that doesn't take special care to handle deep merging 
  of webpack options.
  */
  merge,
  mergeWithRules,
  mergeWithCustomize,
  unique,
};
