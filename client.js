import 'babel-core/polyfill';
import {Map} from 'immutable';
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import configureStore from './store/configureStore';
import universalApp from './helpers/universalApp';

const store = configureStore(Map());

ReactDOM.render(
  universalApp(store),
  document.getElementById('root')
);
