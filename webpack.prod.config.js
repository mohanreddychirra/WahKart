const merge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin');
const common = require('./webpack.common.config');

module.exports = merge(common, {
  mode: 'production',
  performance: { hints: false },
  devtool: 'source-map',
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'styles.css',
      chunkFilename: '[id].[hash].css'
    })
  ],
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
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [ MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader' ]
      },
      {
        test: /\.css$/,
        use: [ MiniCssExtractPlugin.loader, 'css-loader']
      }
    ]
  }
});
