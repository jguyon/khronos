var path = require('path');
var webpack = require('webpack');

var WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
var webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(
  require('./webpack-isomorphic-tools')
);

module.exports = {
  devtool: 'inline-source-map',
  context: path.resolve(__dirname, '..'),
  entry: {
    main: [
      'webpack-dev-server/client?http://localhost:4002',
      'webpack/hot/only-dev-server',
      './client'
    ]
  },
  output: {
    path: path.resolve(__dirname, '../static'),
    filename: 'bundle.js',
    publicPath: 'http://localhost:4002/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      __CLIENT__: true,
      __SERVER__: false,
      __DEVELOPMENT__: true,
      'process.env': {
        BABEL_ENV: JSON.stringify('development/client')
      }
    }),
    webpackIsomorphicToolsPlugin.development()
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel',
      exclude: /node_modules/,
    },
    {
      test: /\.json$/,
      loaders: ['json']
    },
    {
      test: /\.woff$/,
      loader: 'file-loader'
    },
    {
      test: /\.css$/,
      loaders: ['style-loader', 'css-loader']
    }]
  }
};
