import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, applyMiddleware } from 'redux';
import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';

import App from './components/App';
import reducer from './reducers';

/* eslint-disable no-underscore-dangle */
const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk)),
);
/* eslint-enable */

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('.container'),
);
