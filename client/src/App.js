import React, { Component } from 'react';
import BookList from './components/BookList';
import ApolloClient from "apollo-boost";

const client = new ApolloClient({
  uri:''
});

class App extends Component {
  render() {
    return (
      <div id="main">
        <h1>Teste 1</h1>
        <BookList/>
      </div>
    );
  }
}

export default App;
