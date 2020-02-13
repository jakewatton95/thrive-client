import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App'
import { BrowserRouter as Router } from 'react-router-dom'
import {ApolloProvider} from '@apollo/react-hooks'
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { createHttpLink } from 'apollo-link-http'

const httpLink = createHttpLink({
  // uri: "http://localhost:4000"
  uri: "https://apollo.thrivetutoringapp.com/"
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
