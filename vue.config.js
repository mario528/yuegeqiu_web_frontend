// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')
module.exports = {
  publicPath: '',
  outputDir: 'dist',
  assetsDir: '',
  indexPath: 'index.html',
  filenameHashing: true,
  lintOnSave: true,
  pages: {
    index: {
      entry: 'src/main.ts',
      template: '/public/index.html',
      title: '约个球'
    }
  },
  devServer: {
    host: 'localhost',
    port: 3001,
    https: false,
    hotOnly: false,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        // 部署时切换
        // target: 'http://101.201.142.182:3000',
        changeOrigin: true,
        wx: false,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
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
  configureWebpack: {
    externals: {
      "AMap": "AMap"
    }
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [
        path.resolve(__dirname, './src/stylus/scss/app.scss'),
        path.resolve(__dirname, './src/stylus/scss/colorConfig.scss'),
      ]
    }
  }
}