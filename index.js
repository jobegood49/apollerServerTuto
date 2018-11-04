const { ApolloServer, gql } = require('apollo-server');
const { makeExecutableSchema } = require('graphql-tools');
const { find, filter } = require('lodash');



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

const authors = [
    {
        id: 1,
        books: [books[0]],
    },
    {
        id: 2,
        books: [books[1]],
    },
];

const typeDefs = gql`

  type Book {
    title: String
    author: String
  }

  type Author {
    id: Int
    books: [Book]
  }


  type Query {
    # books: [Book]
    # yo: String
    author(id: Int!): Author
  }
`;

// A map of functions which return data for the schema.
const resolvers = {
    Query: {
        // yo: () => 'world',
        // books: () => books,
        author: function(root, args, context, info) {
          let author = find(authors, { id: args.id })
          return author;
        }
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