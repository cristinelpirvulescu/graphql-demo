const { ApolloServer } = require('apollo-server');
const BookTypeDefs = require('./api/books/typedefs');
const BookResolvers = require('./api/books/resolvers');

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs: [BookTypeDefs],
  resolvers: [BookResolvers],
});

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
