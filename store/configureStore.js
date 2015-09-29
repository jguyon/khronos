import {compose, createStore, applyMiddleware} from 'redux';
import {devTools, persistState} from 'redux-devtools';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

let finalCreateStore;

if (__DEVELOPMENT__ && __CLIENT__) {
  finalCreateStore = compose(
    applyMiddleware(thunk),
    devTools(),
    persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
  )(createStore);
} else {
  finalCreateStore = compose(
    applyMiddleware(thunk)
  )(createStore);
}

export default function configureStore(initialState) {
  const store = finalCreateStore(rootReducer, initialState);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers');
      store.replaceReducer(rootReducer);
    });
  }

  return store;
};
