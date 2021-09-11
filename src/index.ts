import dotenv from 'dotenv';
dotenv.config();

import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { ApolloServer } from 'apollo-server';
import PrismaClientPkg from '@prisma/client';

import { getUserId } from './utils.js';
import Query from './resolvers/Query.js';
import Mutation from './resolvers/Mutation.js';
import User from './resolvers/User.js';
import Link from './resolvers/Link.js';

const { PrismaClient } = PrismaClientPkg;
const __dirname = dirname(fileURLToPath(import.meta.url));

const prisma = new PrismaClient();

type Link = {
  id: string,
  url: string,
  description: string
}


const resolvers = {
  Query,
  Mutation,
  User,
  Link
}


const server = new ApolloServer({
  typeDefs: fs.readFileSync(
    path.join(__dirname, 'schema.graphql'),
    'utf8'
  ),
  resolvers,
  context: ({ req }) => {
    return {
      ...req,
      prisma,
      userId: (req && req.headers.authorization && getUserId(req)) || null
    }
  }
});


server
  .listen()
  .then((result:any) => {
    console.log(`Server is running on ${result.url}`)
  });
