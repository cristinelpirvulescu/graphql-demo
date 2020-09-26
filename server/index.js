const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const LibraryTypeDefs = require('./api/library/typedefs');
const LibraryResolvers = require('./api/library/resolvers');
const books = require('./db/books-collection');
const authors = require('./db/authors-collection');
const DB = require('./db');

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs: [LibraryTypeDefs],
  resolvers: [LibraryResolvers],
  // context: async () => ({
  //   db: { books, authors },
  // }),
});

const db = new DB();
db.connect();

const app = express();
server.applyMiddleware({ app });

// The `listen` method launches a web server.
app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://local.graphql.com${server.graphqlPath}`)
);
