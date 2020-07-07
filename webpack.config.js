const merge = require('webpack-merge');
const devConfig = require('./build/webpack.dev.config.js');
const prodConfig = require('./build/webpack.prod.config.js');



function getIPAdress() {
  var interfaces = require("os").networkInterfaces();
  for (var devName in interfaces) {
    var iface = interfaces[devName];
    for (var i = 0; i < iface.length; i++) {
      var alias = iface[i];
      if (
        alias.family === "IPv4" &&
        alias.address !== "127.0.0.1" &&
        !alias.internal
      ) {
        return alias.address;
      }
    }
  }
}

const currentConfig={
  'development': merge(
      devConfig,
      {
        devServer: {
          host: getIPAdress(),
          disableHostCheck: true,
          proxy: {
            '/api': {
              target: '',
              changeOrigin: true,
              pathRewrite: {
                '^/api': ''
              }
            }
          }
        }
      }
    ),
  'production': prodConfig
}


module.exports = currentConfig[process.env.NODE_ENV]



