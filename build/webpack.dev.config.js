const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');
const bodyParser = require('body-parser');
const commonConfig = require('./webpack.base.config.js');
const appConfig = require('./app.config.js');
const middleware = require('./mockMiddleware.js');

const devConfig = {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    historyApiFallback: {
      index: appConfig.absolutePrefix + 'index.html'
    },
    open: true,
    openPage: appConfig.relativePrefix,
    port: 9001,
    hot: true,
    overlay: {
      errors: true
    },
    before(app) {
      app.use(bodyParser.json())
      app.use(bodyParser.urlencoded({ extended: false }))
      app.use(middleware);
    },

  },
  resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom'
    }
  },
  module: {
    rules: [{
      test: /\.less$/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            importLoaders: 2
          }
        },
        'postcss-loader',
        'less-loader'
      ]
    }, {
      test: /\.css$/,
      use: [
        'style-loader',
        'css-loader',
        'postcss-loader'
      ]
    }]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  output: {
    filename: '[name].[hash:8].js',
    publicPath: appConfig.absolutePrefix
  },
}

module.exports = merge(commonConfig, devConfig);
