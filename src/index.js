import React from 'react';
import { Provider } from "react-redux"
import { createStore } from "redux"
import rootReducer from "./store/reducer"
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const store = createStore(rootReducer)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'));

registerServiceWorker();
