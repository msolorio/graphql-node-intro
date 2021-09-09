const fs = require('fs');
const path = require('path');
const { ApolloServer } = require('apollo-server');

let linkIdCount: number = 0;

type Link = {
  id: string,
  url: string,
  description: string
}

let links: Link[] = [
  {
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'Solid learning resources for GraphQL'
  }
]


const resolvers = {
  Query: {
    info: (): string => `A news site for getting helpful links`,
    // retrieve all links
    feed: (): Link[] => links,
    // retrieve a single link
    link: (parent: any, args: any): Link | undefined => {
      return links.find((link: Link) => link.id === `link-${args.id}`)
    }
  },

  Mutation: {
    // create a link
    post: (parent: any, args: any): Link => {
      
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
    updateLink: (parent: any, args: any): Link => {
      let updatedLink: Link = { id: '', url: '', description: '' };

      const updatedLinks: Link[] = links.map((link: any) => {
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
    deleteLink: (parent: any, args: any): Link | undefined => {
      const linkToDelete: Link | undefined = links.find((link: Link) => link.id === `link-${args.id}`);
      const updatedLinks: Link[] = links.filter((link: Link) => link.id !== `link-${args.id}`);

      links = updatedLinks;

      return linkToDelete;
    }
  },

  // Can be removed bc GraphQL infers the structure of a Link
  // Link: {
  //   id: (parent: any) => parent.id,
  //   description: (parent: any) => parent.description,
  //   url: (parent: any) => parent.url
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
  .then((result:any) => {
    console.log(`Server is running on ${result.url}`)
  });
