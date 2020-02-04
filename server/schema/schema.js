const graphql = require("graphql");
const Book = require("../models/book");
const Author = require("../models/author");

const {
	GraphQLObjectType,
	GraphQLString,
	GraphQLID,
	GraphQLInt,
	GraphQLList,
	GraphQLNonNull,
	GraphQLSchema
} = graphql;

const BookType = new GraphQLObjectType({
	name: "Book",
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		genre: { type: GraphQLString },
		author: {
			type: AuthorType,
			resolve: (value, args) => {
				return Author.findById(value.authorId);
			}
		}
	})
});

const AuthorType = new GraphQLObjectType({
	name: "Author",
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		age: { type: GraphQLInt },
		books: {
			type: new GraphQLList(BookType),
			resolve: (value, args) => {
				return Book.find({ authorId: value.id });
			}
		}
	})
});

const RootQuery = new GraphQLObjectType({
	name: "RootQueryType",
	fields: {
		book: {
			type: BookType,
			args: {
				id: { type: GraphQLID }
			},
			resolve: (value, { id }) => {
				return Book.findById(id);
			}
		},
		author: {
			type: AuthorType,
			args: {
				id: { type: GraphQLID }
			},
			resolve: (value, { id }) => {
				return Author.findById(id);
			}
		},
		books: {
			type: new GraphQLList(BookType),
			resolve: () => {
				return Book.find({});
			}
		},
		authors: {
			type: new GraphQLList(AuthorType),
			resolve: () => {
				return Author.find({});
			}
		}
	}
});

const Mutation = new GraphQLObjectType({
	name: "Mutation",
	fields: {
		addAuthor: {
			type: AuthorType,
			args: {
				name: { type: new GraphQLNonNull(GraphQLString) },
				age: { type: new GraphQLNonNull(GraphQLInt) }
			},
			resolve: (value, { name, age }) => {
				let author = new Author({ name, age });
				return author.save();
			}
		},
		addBook: {
			type: BookType,
			args: {
				name: { type: new GraphQLNonNull(GraphQLString) },
				genre: { type: new GraphQLNonNull(GraphQLString) },
				authorId: { type: new GraphQLNonNull(GraphQLID) }
			},
			resolve: (value, { name, genre, authorId }) => {
				let book = new Book({ name, genre, authorId });
				return book.save();
			}
		},
		deleteBook: {
			type: BookType,
			args: {
				id: { type: new GraphQLNonNull(GraphQLID) }
			},
			resolve: (value, { id }) => {
				return Book.deleteOne({ _id: id });
			}
		},
		deleteAuthor: {
			type: AuthorType,
			args: {
				id: { type: new GraphQLNonNull(GraphQLID) }
			},
			resolve: (value, { id }) => {
				return Author.deleteOne({ _id: id });
			}
		}
	}
});

module.exports = new GraphQLSchema({ query: RootQuery, mutation: Mutation });
