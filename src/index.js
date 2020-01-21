import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App'
import {Provider} from 'react-redux'
import { createStore } from 'redux'
import { BrowserRouter as Router } from 'react-router-dom'
import reducer from './store/reducers/reducer'
import { devToolsEnhancer } from 'redux-devtools-extension';


const store = createStore(reducer, devToolsEnhancer())

ReactDOM.render(
  <Provider store = {store}>
  <Router>
    <App />
  </Router>
  </Provider>
,
  document.getElementById('root')
);

module.hot.accept()
