import Express from 'express';
import compression from 'compression';
import serveStatic from 'serve-static';
import {Map} from 'immutable';
import React from 'react';
import ReactDOM from 'react-dom/server';
import Html from './helpers/Html';
import universalApp from './helpers/universalApp';
import configureStore from './store/configureStore';

const app = new Express();

app.use(compression());
app.use(serveStatic('static'));

app.get('/', (req, res) => {
  if (__DEVELOPMENT__) {
    webpackIsomorphicTools.refresh();
  }

  const store = configureStore(Map());
  const component = universalApp(store);

  res.send('<!DOCTYPE html>' + ReactDOM.renderToString(
    <Html
      assets={webpackIsomorphicTools.assets()}
      store={store}
      component={component} />
  ));
});

const port = __DEVELOPMENT__ ? 4001 : process.env.PORT;

app.listen(port, (err) => {
  if (err) {
    console.error(err);
  }

  console.info(`Listening to port ${port}`);
});
