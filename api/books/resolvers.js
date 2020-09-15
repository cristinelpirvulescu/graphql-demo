const books = require('../../db/mock-data');

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const BookResolvers = {
  Query: {
    books: () => books,
  },
};

module.exports = BookResolvers;
