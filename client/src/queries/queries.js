import { gql } from "apollo-boost";

const getBooksQuery = gql`
	{
		books {
			name
			id
		}
	}
`;

const getAuthorsQuery = gql`
	{
		authors {
			name
			id
		}
	}
`;

const addBookMutation = gql`
	mutation($name: String!, $genre: String!, $authorId: ID!) {
		addBook(name: $name, genre: $genre, authorId: $authorId) {
			name
			id
		}
	}
`;

const getBookQuery = gql`
	query($id: ID) {
		book(id: $id) {
			id
			name
			genre
			author {
				id
				name
				age
				books {
					id
					name
				}
			}
		}
	}
`;

const deleteBook = gql`
	mutation($id: ID!) {
		deleteBook(id: $id) {
			id
			name
			genre
			author {
				name
			}
		}
	}
`;

export {
	getBooksQuery,
	getAuthorsQuery,
	addBookMutation,
	getBookQuery,
	deleteBook
};
