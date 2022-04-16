import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';

import reducers from './components/reducers';
import Visualizer from './components/Visualizer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(reduxThunk))
)

const rootCon = document.querySelector('#root');
const root = ReactDOM.createRoot(rootCon);
root.render(<Provider store={store}>
              <Visualizer />
            </Provider>)