import React, { Component } from "react";
import BookList from "./components/BookList";
import AddBook from './components/AddBook';
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

const client = new ApolloClient({
	uri: "http://localhost:4000/graphql",
});

class App extends Component {
	render() {
		return (
			<ApolloProvider client={client}>
				<div id="main">
					<h1>Teste 1</h1>
					<BookList />
					<br/>
					<AddBook/>
				</div>
			</ApolloProvider>
		);
	}
}

export default App;
