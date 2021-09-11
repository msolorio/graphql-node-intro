import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { ApolloServer } from 'apollo-server';
import PrismaClientPkg from '@prisma/client';
import { feed, link, info } from './resolvers/Query.js';
import { post, updateLink, deleteLink } from './resolvers/Mutation.js';
const { PrismaClient } = PrismaClientPkg;
const __dirname = dirname(fileURLToPath(import.meta.url));

const prisma = new PrismaClient();

type Link = {
  id: string,
  url: string,
  description: string
}


const resolvers = {
  Query: {
    info,
    feed, // retrieve all links
    link // retrieve a single link
  },

  Mutation: {
    post, // create a link
    updateLink, // update a link
    deleteLink // delete a link
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
