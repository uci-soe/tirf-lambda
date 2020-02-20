// const { ApolloServer, makeExecutableSchema } = require('apollo-server-lambda');
// const { readFileSync }                       = require('fs');
//
// const context = require('./context-resolver');
// const schema  = makeExecutableSchema({
//   typeDefs:  readFileSync('./schema.graphql').toString(),
//   resolvers: require('./resolvers'),
// });
//
// const server = new ApolloServer({ schema });

// exports.handler = server.createHandler();
exports.handler = function (event, context) {
  console.log(event);
  context.succeed('hello');
};


// {
//   database: process.env.DATABASE,
//     host:     process.env.HOST,
//   port:     process.env.PORT,
//   user:     process.env.USERNAME,
//   pass:     process.env.PASSWORD,
// }
