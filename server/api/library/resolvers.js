const authors = require('../../db/authors-collection');
const books = require('../../db/books-collection');
const Book = require('./book');
const Author = require('./author');

const addBook = async (_, { input }, context) => {
  const newBook = new Book({ ...input });

  await newBook.save();

  return newBook;
};

const editBook = async (_, { input }, context) => {
  const { id: bookId, authorId, ...rest } = input;

  if (!bookId) {
    console.log(input);
    return null;
  }

  const bookFilter = {
    _id: bookId,
  };
  const newBookData = {
    authorId,
    ...rest,
  };

  await Book.update(bookFilter, newBookData);

  if (authorId) {
    const authorFilter = {
      _id: authorId,
    };
    const newAuthorData = {
      $addToSet: {
        books: bookId,
      },
    };
    await Author.update(authorFilter, newAuthorData);
  }

  const bookEntry = await Book.findOne(bookFilter);
  return bookEntry;
};

const addAuthor = async (_, { input }, context) => {
  const { name } = input;

  const existingAuthor = await Author.getAuthor({ name });

  if (existingAuthor) {
    console.log(existingAuthor);
    return existingAuthor;
  }

  const newAuthor = new Author({ ...input });

  await newAuthor.save();

  return newAuthor;
};

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const LibraryResolvers = {
  Query: {
    book: (parent, { id }) => {
      return Book.getBook(id);
    },
    author: (parent, { id }) => {
      return Author.getAuthor({ id });
    },
    books: async () => Book.getAll(),
    authors: async () => Author.getAll(),
  },
  Mutation: {
    addBook,
    editBook,
    addAuthor,
  },
  Book: {
    author: async (parent) => {
      const author = await Author.findOne({ _id: parent.authorId });
      return author;
    },
  },
  Author: {
    books: (parent, args, context) => {
      // const authorBooks = parent.books;
      console.log(parent.books);
      return Book.find({
        _id: {
          $in: parent.books,
        },
      });
    },
  },
};

module.exports = LibraryResolvers;
