import React, { useState } from "react";
import { useMutation, useQuery } from "react-apollo";
import {
	addBookMutation,
	getAuthorsQuery,
	getBooksQuery
} from "../queries/queries";

function AddBook() {
	const [name, setName] = useState("");
	const [genre, setGenre] = useState("");
	const [authorId, setAuthorId] = useState("");

	const { data: authorsData, error, loading } = useQuery(getAuthorsQuery);
	const [addBook, { newBook }] = useMutation(addBookMutation);

	const submitForm = e => {
		e.preventDefault();
		addBook({
			variables: {
				name,
				genre,
				authorId
			},
			refetchQueries: [{ query: getBooksQuery }]
		});
	};

	const displayAuthors = () => {
		console.log(authorsData);
		if (loading) {
			return <option disabled>Loading Authors...</option>;
		} else {
			return (
				authorsData &&
				authorsData.authors.map(author => (
					<option key={author.id} value={author.id}>
						{author.name}
					</option>
				))
			);
		}
	};

	return (
		<form className='add-book' onSubmit={submitForm}>
			<div className='field'>
				<label>Book name:</label>
				<input
					type='text'
					value={name}
					onChange={e => setName(e.target.value)}
				/>
			</div>

			<div className='field'>
				<label>Genre</label>
				<input
					type='text'
					value={genre}
					onChange={e => setGenre(e.target.value)}
				/>
			</div>

			<div className='field'>
				<label>Author</label>
				<select onChange={e => setAuthorId(e.target.value)}>
					<option>Select author</option>
					{displayAuthors()}
				</select>
			</div>

			<button>+</button>
		</form>
	);
}

export default AddBook;
