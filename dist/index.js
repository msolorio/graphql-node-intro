var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var PrismaClient = PrismaClientPkg.PrismaClient;
var __dirname = dirname(fileURLToPath(import.meta.url));
var prisma = new PrismaClient();
var resolvers = {
    Query: Query,
    Mutation: Mutation,
    User: User,
    Link: Link
};
var server = new ApolloServer({
    typeDefs: fs.readFileSync(path.join(__dirname, 'schema.graphql'), 'utf8'),
    resolvers: resolvers,
    context: function (_a) {
        var req = _a.req;
        return __assign(__assign({}, req), { prisma: prisma, userId: (req && req.headers.authorization && getUserId(req)) || null });
    }
});
server
    .listen()
    .then(function (result) {
    console.log("Server is running on " + result.url);
});
