var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./dev.config');

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true,
  stats: {
    colors: true
  }
}).listen(4002, 'localhost', function (err) {
  if (err) {
    console.error(err);
  }

  console.info('Listening to localhost:4002');
});
