const { ApolloServer, gql } = require('apollo-server');
const { makeExecutableSchema } = require('graphql-tools');


const books = [
    {
        title: 'Harry Potter and the Chamber of Secrets',
        author: 'J.K. Rowling',
    },
    {
        title: 'Jurassic Park',
        author: 'Michael Crichton',
    },
];

const typeDefs = gql`

  type Book {
    title: String
    author: String
  }

  type Query {
    books: [Book]
    yo: String
  }
`;

// A map of functions which return data for the schema.
const resolvers = {
    Query: {
        yo: () => 'world',
        books: () => books
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