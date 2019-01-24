const merge = require('webpack-merge');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin');
const common = require('./webpack.common.config');

module.exports = merge(common, {
  mode: 'production',
  performance: { hints: false },
  devtool: 'source-map',
  optimization: {
    minimizer: [
      new UglifyjsWebpackPlugin({
        cache: true,
        test: /\.jsx?$/i,
        parallel: true,
        sourceMap: true,
        extractComments: true
      }),
      new OptimizeCssAssetsWebpackPlugin({})
    ]
  }
});
