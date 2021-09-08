const fs = require('fs');
const path = require('path');
const { ApolloServer } = require('apollo-server');

let linkIdCount = 0;

let links = [
  {
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'Solid learning resources for GraphQL'
  }
]


const resolvers = {
  Query: {
    info: () => `A news site for getting helpful links`,
    feed: () => links,
  },

  Mutation: {
    post: (parent, args) => {
      
      linkIdCount++;

      const link = {
        id: `link-${linkIdCount}`,
        description: args.description,
        url: args.url
      };

      links = [...links, link];

      return link;
    }
  },

  // Can be removed bc GraphQL infers the structure of a Link
  // Link: {
  //   id: (parent) => parent.id,
  //   description: (parent) => parent.description,
  //   url: (parent) => parent.url
  // }
}


const server = new ApolloServer({
  typeDefs: fs.readFileSync(
    path.join(__dirname, 'schema.graphql'),
    'utf8'
  ),
  resolvers
});


server
  .listen()
  .then(({ url }) => {
    console.log(`Server is running on ${url}`)
  });
