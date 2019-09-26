const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const appConfig = require('./app.config.js');
const srcPath = '../assets/';
const staticPrefix = process.env.NODE_ENV == 'development' ? '' : appConfig.relativePrefix
module.exports = {
  entry: {
    app: [
      'react-hot-loader/patch',
      path.join(__dirname, srcPath, 'index.js')
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      components: path.join(__dirname, srcPath, 'components'),
      router: path.join(__dirname, srcPath, 'router'),
      store: path.join(__dirname, srcPath, 'store'),
      pages: path.join(__dirname, srcPath, 'pages'),
      api: path.join(__dirname, srcPath, 'api'),
      utils: path.join(__dirname, srcPath, 'utils'),
      public: path.join(__dirname, srcPath, 'public')
    }
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /.(js|jsx)$/,
        loader: 'eslint-loader',
        exclude: [
          path.resolve(__dirname, '../node_modules')
        ],
        options: {
          fix: true
        }
      },
      {
        test: /.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: [
          path.join(__dirname, '../node_modules')
        ],
        options: {
          cacheDirectory: true
        }
      },
      {
        test: /\.(png|jpg|gif|svg|pdf)$/,
        use: {
          loader: 'url-loader',
          options: {
            name: staticPrefix + 'imgs/[name].[contenthash:8].[ext]',
            limit: 10240
          }
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: staticPrefix + 'fonts/[name].[contenthash:8].[ext]'
          }
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        use: {
          loader: 'file-loader',
          options: {
            name: staticPrefix + 'media/[name].[contenthash:8].[ext]'
          }
        }
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'process.env.APP_PREFIX': JSON.stringify(appConfig.absolutePrefix)
    }),
    new HtmlWebpackPlugin({
      template: 'assets/index.html',
      templateParameters: {
        appPrefix: process.env.NODE_ENV == 'development' ? '/' : appConfig.prodPublicPath + appConfig.relativePrefix
      }
    }),
    new CleanWebpackPlugin()
  ],
  performance: false,
  output: {
    path: path.resolve(__dirname, '../dist')
  }
}
