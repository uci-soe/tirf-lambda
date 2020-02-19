const { ApolloServer, makeExecutableSchema } = require('apollo-server-lambda');
const { readFileSync }                       = require('fs');

const context = require('./context-resolver');
const schema  = makeExecutableSchema({
  typeDefs:  readFileSync('./schema.graphql').toString(),
  resolvers: require('./resolvers'),
});

const server = new ApolloServer({ schema });

module.exports.handler = server.createHandler();
