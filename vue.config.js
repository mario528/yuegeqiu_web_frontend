// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')
const isProductionEnv = process.env.NODE_ENV == 'production'
module.exports = {
  publicPath: '',
  outputDir: 'dist',
  assetsDir: '',
  indexPath: 'index.html',
  filenameHashing: true,
  lintOnSave: true,
  productionSourceMap: false,
  pages: {
    index: {
      entry: 'src/main.ts',
      template: '/public/index.html',
      title: '约个球'
    }
  },
  devServer: {
    host: 'localhost',
    port: isProductionEnv ? 3000 : 3001,
    https: false,
    hotOnly: false,
    proxy: {
      '/api': {
        target: isProductionEnv ? 'http://101.201.142.182:3000' : 'http://localhost:3000',
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
  // webpack-chain
  // https://github.com/mozilla-neutrino/webpack-chain#getting-started
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
    // 自动化导入全局样式表
    // style-resources-loader
    // https://github.com/yenshih/style-resources-loader 
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [
        path.resolve(__dirname, './src/stylus/scss/app.scss'),
        path.resolve(__dirname, './src/stylus/scss/colorConfig.scss'),
      ]
    }
  }
}