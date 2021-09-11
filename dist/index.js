import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { ApolloServer } from 'apollo-server';
import PrismaClientPkg from '@prisma/client';
import { feed, link, info } from './resolvers/Query.js';
import { post, updateLink, deleteLink } from './resolvers/Mutation.js';
var PrismaClient = PrismaClientPkg.PrismaClient;
var __dirname = dirname(fileURLToPath(import.meta.url));
var prisma = new PrismaClient();
var resolvers = {
    Query: {
        info: info,
        feed: feed,
        link: link // retrieve a single link
    },
    Mutation: {
        post: post,
        updateLink: updateLink,
        deleteLink: deleteLink // delete a link
    },
    // Can be removed bc GraphQL infers the structure of a Link
    // Link: {
    //   id: (parent: any) => parent.id,
    //   description: (parent: any) => parent.description,
    //   url: (parent: any) => parent.url
    // }
};
var server = new ApolloServer({
    typeDefs: fs.readFileSync(path.join(__dirname, 'schema.graphql'), 'utf8'),
    resolvers: resolvers,
    context: {
        prisma: prisma
    }
});
server
    .listen()
    .then(function (result) {
    console.log("Server is running on " + result.url);
});
