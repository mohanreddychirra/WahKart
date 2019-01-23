const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.(png|jpg)$/,
        exclude: /node_modules/,
        use: 'file-loader'
      }
    ]
  },

  resolve: {
    extensions: ['.js', '.jsx']
  },

  devServer: {
    port: 4000,
    contentBase: path.join(__dirname, 'public'),
    historyApiFallback: true,
    proxy: {
      '/api': 'http://localhost:8000'
    }
  }
};
