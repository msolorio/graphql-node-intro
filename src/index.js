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
    // retrieve all links
    feed: () => links,
    // retrieve a single link
    link: (parent, args) => {
      return links.find(link => link.id === `link-${args.id}`)
    }
  },

  Mutation: {
    // create a link
    post: (parent, args) => {
      
      linkIdCount++;

      const link = {
        id: `link-${linkIdCount}`,
        description: args.description,
        url: args.url
      };

      links = [...links, link];

      return link;
    },

    // update a link
    updateLink: (parent, args) => {
      let updatedLink = {};

      const updatedLinks = links.map(link => {
        if (link.id !== `link-${args.id}`) return link;

        updatedLink = (
          {
            ...link,
            url: args.url,
            description: args.description
          }
        );

        return updatedLink;
      });

      links = updatedLinks;

      return updatedLink;
    },

    // delete a link
    deleteLink: (parent, args) => {
      const linkToDelete = links.find(link => link.id === `link-${args.id}`);
      const updatedLinks = links.filter(link => link.id !== `link-${args.id}`);

      links = updatedLinks;

      return linkToDelete;
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
