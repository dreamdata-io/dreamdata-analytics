const path = require('path');
const webpack = require('webpack');
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: path.join(__dirname, '/lib'),
  resolve: {
    extensions: ['.js']
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  plugins: [
    new CompressionPlugin(),
    new webpack.DefinePlugin({
      PACKAGE_VERSION: JSON.stringify(require('./package.json').version)
    })
  ],
  output: {
    library: 'dreamdata',
    libraryTarget: 'umd',
    filename: 'dreamdata.min.js'
  }
};
