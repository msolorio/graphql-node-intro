const { ApolloServer } = require('apollo-server');

const users = [
  { id: '1', name: 'Phil' },
  { id: '2', name: 'Kim' }
];


// Defines the GraphQL schema. Has an info fields that is a string, and is required
const typeDefs = `
  type User {
    id: ID!
    name: String!
  }

  type Query {
    users: [User!]!
    user(id: ID!): User
  }

  type Mutation {
    createUser(name: String!): User!
  }
`

// Actual implementation of the GraphQL schema
const resolvers = {
  Query: {
    users: () => users,
    user: () => users.find(user => user.id === '2')
  },
  Mutation: {
    createUser: () => ({ id: '3', name: 'Frankie' })
  }
}


// Creates the server and tells it what API operations are accepted
// and how to resolve them
const server = new ApolloServer({
  typeDefs,
  resolvers
})


server
  .listen()
  .then(({ url }) => {
    console.log(`Server is running on ${url}`);
  });