import React, { useState } from "react";
import { getBooksQuery, deleteBookMutation } from "../queries/queries";
import BookDetail from "./BookDetails";
import { useQuery, useMutation } from "@apollo/react-hooks";

function BookList() {
	const [bookId, setBookId] = useState();
	const { loading, error, data } = useQuery(getBooksQuery);
	const [deleteBook, { objDeleted }] = useMutation(deleteBookMutation);

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
		if (loading) {
			return <div>Loading Books...</div>;
		} else {
			return data.books.map(book => (
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

export default BookList;
