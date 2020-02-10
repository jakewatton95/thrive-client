import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App'
import { BrowserRouter as Router } from 'react-router-dom'
import {ApolloProvider} from '@apollo/react-hooks'
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { createHttpLink } from 'apollo-link-http'

//import {Provider} from 'react-redux'
//import { createStore } from 'redux'
//import reducer from './store/reducers/reducer'
//import { devToolsEnhancer } from 'redux-devtools-extension';

//const store = createStore(reducer, devToolsEnhancer())

const httpLink = createHttpLink({

  uri: "http://3.231.93.61:4000/"
});

const client =  new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  resolvers: {},
  connectToDevTools: true
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Router>
      <App />
    </Router>
  </ApolloProvider>
,
  document.getElementById('root')
);

module.hot.accept()
