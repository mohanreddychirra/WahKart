const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.config');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    port: 4000,
    contentBase: path.join(__dirname, 'public'),
    historyApiFallback: true,
    proxy: {
      '/api': 'http://localhost:8000'
    }
  }
});
