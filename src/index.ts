import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { ApolloServer } from 'apollo-server';
import PrismaClientPkg from '@prisma/client';
const { PrismaClient } = PrismaClientPkg;
const __dirname = dirname(fileURLToPath(import.meta.url));

const prisma = new PrismaClient();

// let linkIdCount: number = 0;

type Link = {
  id: string,
  url: string,
  description: string
}

// let links: Link[] = [
//   {
//     id: 'link-0',
//     url: 'www.howtographql.com',
//     description: 'Solid learning resources for GraphQL'
//   }
// ]


const resolvers = {
  Query: {
    info: (): string => `A news site for getting helpful links`,
    // retrieve all links
    feed: async (parent: any, args: any, context: any) => {
      return context.prisma.link.findMany();
    },
    // retrieve a single link
    link: async (parent: any, args: any, context: any) => {
      return context.prisma.link.findUnique({ 
        where: { id: Number(args.id) } 
      });
    }
  },

  Mutation: {
    // create a link
    post: (parent: any, args: any, context: any): Link => {

      const newLink = context.prisma.link.create({
        data: {
          url: args.url,
          description: args.description
        }
      })

      return newLink;
    },

    // update a link
    updateLink: async (parent: any, args: any, context: any) => {
      const updateObj: any = {};

      if (args.url) updateObj.url = args.url;
      if (args.description) updateObj.description = args.description;

      return context.prisma.link.update({
        where: { id: Number(args.id) },
        data: { ...updateObj }
      });
    },

    // delete a link
    deleteLink: async (parent: any, args: any, context: any) => {
      return context.prisma.link.delete({
        where: { id: Number(args.id) } 
      });
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
  resolvers,
  context: {
    prisma
  }
});


server
  .listen()
  .then((result:any) => {
    console.log(`Server is running on ${result.url}`)
  });
