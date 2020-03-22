// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')
module.exports = {
  publicPath: '',
  outputDir: 'dist',
  assetsDir: '',
  indexPath: 'index.html',
  filenameHashing: true,
  lintOnSave: true,

  chainWebpack: config => {
      config.module
        .rule("eslint")
        .use("eslint-loader")
        .loader("eslint-loader")
        .tap(options => {
          options.fix = true;
          return options;
        });
  },

  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [
        path.resolve(__dirname, './src/stylus/scss/app.scss'),
      ]
    }
  }
}
