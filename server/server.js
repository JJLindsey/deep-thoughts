const express = require('express');
const { ApolloServer } = require('apollo-server-express');

//import typeDefs and resolvers
const { typeDefs, resolvers } = require('./schemas')
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
const app = express();
//create new Apollo server & pass in schema data
const server = new ApolloServer({
  typeDefs, resolvers
});

//integrate Apollo w/ Express applications as middleware
server.start().then(() => {
  server.applyMiddleware({ app })
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    //log to test GraphQL API
    console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
  });
});
