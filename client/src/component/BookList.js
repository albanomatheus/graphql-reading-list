import React, { useState } from "react";
import { graphql } from "react-apollo";
import { getBooksQuery, deleteBook } from "../queries/queries";
import { flowRight as compose } from "lodash";

import BookDetail from "./BookDetails";

function BookList({ getBooks, deleteBook }) {
	const [bookId, setBookId] = useState();

	const deleteBookHandle = id => {
		deleteBook({
			variables: { id },
			refetchQueries: [{ query: getBooksQuery }]
		}).then(() => {
			if (id === bookId) {
				setBookId(null);
			}
		});
	};

	const displayBooks = () => {
		if (getBooks.loading) {
			return <div>Loading Books...</div>;
		} else {
			return getBooks.books.map(book => (
				<li key={book.id}>
					<span onClick={e => setBookId(book.id)}>{book.name}</span>
					<button onClick={() => deleteBookHandle(book.id)}>X</button>
				</li>
			));
		}
	};

	return (
		<div>
			<ul id='book-list'>{displayBooks()}</ul>
			<BookDetail bookId={bookId} />
		</div>
	);
}

export default compose(
	graphql(getBooksQuery, { name: "getBooks" }),
	graphql(deleteBook, { name: "deleteBook" })
)(BookList);
