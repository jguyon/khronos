require('babel/register');
var path = require('path');
var rootDir = path.resolve(__dirname, '..');

global.__CLIENT__ = false;
global.__SERVER__ = true;
global.__DEVELOPMENT__ = process.env.NODE_ENV !== 'production';

var WebpackIsomorphicTools = require('webpack-isomorphic-tools');
global.webpackIsomorphicTools = new WebpackIsomorphicTools(
  require('../webpack/webpack-isomorphic-tools')
).development(__DEVELOPMENT__).server(rootDir, function () {
  require('../server');
});
