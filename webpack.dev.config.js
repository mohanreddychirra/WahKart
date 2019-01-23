const merge = require('webpack-merge');
const common = require('./webpack.common.config');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [ 'style-loader', 'css-loader', 'sass-loader' ]
      },
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader']
      }
    ]
  }
});
