const { ApolloServer, gql } = require('apollo-server');
const { makeExecutableSchema } = require('graphql-tools');



// The GraphQL schema
const typeDefs = gql`
  type Query {
    "A simple type for getting started!"
    yo: String
  }
`;

// A map of functions which return data for the schema.
const resolvers = {
    Query: {
        yo: () => 'world'
    }
};

const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
});

const server = new ApolloServer({
    // typeDefs,
    // resolvers,
    schema
});

server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`)
});