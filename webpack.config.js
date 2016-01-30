var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: {
    app: process.argv[4]
  },
  output: {
    filename: '[name].webpack.bundle.js',
    path: __dirname + '/gen'
  },
  resolve: {
    root: [
      path.join(process.cwd(), '/node_modules'),
      path.join(__dirname, '/../../node_modules')
    ],
    moduleDirectories: [
      'node_modules'
    ]
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' }
    ]
  },
};
