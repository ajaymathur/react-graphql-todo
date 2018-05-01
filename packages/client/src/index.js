import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost';
import gql from 'graphql-tag';
import { ApolloProvider } from 'react-apollo';
import './index.css';
import Todo from './Todo';
import Footer from './Footer';
import registerServiceWorker from './registerServiceWorker';

const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql'
});

ReactDOM.render(
<ApolloProvider client={client}>
  <Todo />
  <Footer />
</ApolloProvider>
, document.getElementById('root'));
registerServiceWorker();
