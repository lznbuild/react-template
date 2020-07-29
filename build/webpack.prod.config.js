const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin')
const merge = require('webpack-merge');
const appConfig = require('./app.config.js');

const commonConfig = require('./webpack.base.config.js');

function getPublicPath() {
  if (appConfig.prodPublicPath === "./") {
    return "../";
  } else {
    return appConfig.absolutePrefix;
  }
}

const isDev = process.env.NODE_ENV === "development";

const publicPath = getPublicPath();
const outputPath = isDev ? "" : appConfig.relativePrefix;


const prodConfig = (module.exports = {
  mode: "production",
  devtool: "cheap-module-source-map",
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              importLoaders: 2
            }
          },
          "postcss-loader",
          "less-loader"
        ]
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"]
      },
      {
        test: /\.(png|jpg|gif|svg|pdf)$/,
        exclude: [path.join(__dirname, "../node_modules")],
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[contenthash:8].[ext]",
              publicPath: publicPath + "imgs/",
              outputPath: outputPath + "imgs/"
            }
          },
          {
            loader: "image-webpack-loader",
            options: {
              // name: "static/img/[name].[ext]?[hash]",
              mozjpeg: {
                progressive: true,
                quality: 65
              },
              // optipng.enabled: false will disable optipng
              optipng: {
                enabled: false
              },
              pngquant: {
                quality: [0.65, 0.9],
                speed: 4
              },
              gifsicle: {
                interlaced: false
              }
            }
          }
        ]
      }
    ]
  },
  optimization: {
    minimizer: [
      new OptimizeCSSAssetsPlugin({}),
      new TerserJSPlugin({
        cache: true,
        sourceMap: true,
        parallel: 4
      })
    ],
    usedExports: true,
    splitChunks: {
      chunks: "all",
      automaticNameDelimiter: ".",
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          // node_modules的包全部拆分开
          name(module) {
            const packageName = module.context.match(
              /[\\/]node_modules[\\/](.*?)([\\/]|$)/
            )[1];
            return `npm.${packageName.replace("@", "")}`;
          }
        },
        commons: {
          name: "commons",
          chunks: "initial",
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    },
    runtimeChunk: {
      name: "runtime"
    }
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: appConfig.relativePrefix + "css/[name].[contenthash:8].css"
    }),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, "../static"),
        to: appConfig.relativePrefix + "static",
        ignore: [".*"]
      },
      {
        from: path.resolve(__dirname, "../styles"),
        to: appConfig.relativePrefix + "styles",
        ignore: [".*"]
      }
    ])
  ],
  output: {
    filename: appConfig.relativePrefix + "js/[name].[chunkhash:8].js",
    chunkFilename: appConfig.relativePrefix + "js/[name].[chunkhash:8].js",
    publicPath: appConfig.prodPublicPath || "/"
  }
});
module.exports = merge(commonConfig, prodConfig);
