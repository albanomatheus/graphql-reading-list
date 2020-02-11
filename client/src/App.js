import React from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { InMemoryCache } from "apollo-cache-inmemory";

import BookList from "./component/BookList";
import AddBook from "./component/AddBook";

const client = new ApolloClient({
	uri: "http://localhost:4000/graphql",
	cache: new InMemoryCache()
});

function App() {
	return (
		<ApolloProvider client={client}>
			<div id='main'>
				<h1>My BookStore</h1>
				<BookList />
				<AddBook />
			</div>
		</ApolloProvider>
	);
}

export default App;
