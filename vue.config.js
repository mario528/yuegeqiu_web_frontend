// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')
const isProductionEnv = process.env.NODE_ENV == 'production'
const UglifyPlugin = require('uglifyjs-webpack-plugin')
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
    https: true,
    hotOnly: false,
    proxy: {
      '/api': {
        // 部署时切换
        target: isProductionEnv ? 'https://101.201.142.182:3000' : 'http://localhost:3000',
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
  // configureWebpack: {
  //   externals: {
  //     "AMap": "AMap"
  //   }
  // },
  configureWebpack: config => {
    config.externals = {
      "AMap": "AMap"
    }
    if (isProductionEnv) {
      // 生产环境下
      config.plugins = config.plugins.concat([
        new UglifyPlugin({
          uglifyOptions: {
            compress: {
                warnings: false,
                drop_debugger: true,
                drop_console: true,
            },
          }
        })
      ])
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