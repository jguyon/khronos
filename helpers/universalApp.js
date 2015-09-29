import React from 'react';
import {Provider} from 'react-redux';
import {DevTools, DebugPanel, LogMonitor} from 'redux-devtools/lib/react';
import App from '../containers/App';

const universalApp = (store) => {
  if (__DEVELOPMENT__) {
    return <div>
      <Provider store={store}>
        <App />
      </Provider>
      <DebugPanel top right bottom>
        <DevTools store={store} monitor={LogMonitor} />
      </DebugPanel>
    </div>
  }

  return <Provider store={store}>
    <App />
  </Provider>
};

export default universalApp;
