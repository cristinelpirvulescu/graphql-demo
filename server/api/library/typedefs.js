const { gql } = require('apollo-server-express');

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const LibraryTypeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type Book {
    _id: String
    title: String
    author: Author
  }

  type Author {
    _id: String
    name: String
    books: [Book]
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    book(id: String!): Book
    author(id: String!): Author
    books: [Book]
    authors: [Author]
  }

  input BookDataCreate {
    title: String!
    authorId: String!
  }

  input BookDataEdit {
    id: String!
    title: String
    authorId: String
  }

  input AuthorDataCreate {
    name: String!
  }

  type Mutation {
    addBook(input: BookDataCreate!): Book
    addAuthor(input: AuthorDataCreate!): Boolean
    editBook(input: BookDataEdit!): Book
  }
`;

module.exports = LibraryTypeDefs;
