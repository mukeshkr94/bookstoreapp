import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// createing store

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import RootReducers from './services/Reducers/RootReducers';
const store = createStore(RootReducers)
// 


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);


