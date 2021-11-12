const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
  "stories": [
    "../**/*.stories.mdx",
    "../**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "storybook-addon-outline",
    "@storybook/addon-storysource",
    "@storybook/addon-a11y",
    "storybook-dark-mode",
    "@storybook/addon-viewport",
    "@storybook/addon-actions",
    "@storybook/addon-docs",
    "@storybook/addon-controls",
    "@storybook/addon-backgrounds",
  ],
  webpackFinal: (config) => {
    config.resolve.plugins = [
      ...(config.resolve.plugins || []),
      new TsconfigPathsPlugin({
        extensions: config.resolve.extensions,
      }),
    ];
    return config;
  },
}