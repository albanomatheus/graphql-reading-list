import React from "react";
import { gql } from "apollo-boost";

import { getBookQuery } from "../queries/queries";
import { useQuery, useApolloClient } from "@apollo/react-hooks";

function BookDetails({ bookId }) {
	const { data, loading, error } = useQuery(getBookQuery, {
		variables: { id: bookId }
	});

	const displayBookDetails = () => {
		let book = data && data.book;
		if (book) {
			return (
				<div>
					<h1>{book.name}</h1>
					<p>{book.genre}</p>
					<p>{book.author.name}</p>
					<p>All books by this author: </p>
					<ul className='other-books'>
						{book.author.books.map(item => (
							<li key={item.id}>{item.name}</li>
						))}
					</ul>
				</div>
			);
		} else {
			return <div>No book selected...</div>;
		}
	};

	return <div id='book-details'>{displayBookDetails()}</div>;
}

export default BookDetails;
