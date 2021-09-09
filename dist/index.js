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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { ApolloServer } from 'apollo-server';
import PrismaClientPkg from '@prisma/client';
var PrismaClient = PrismaClientPkg.PrismaClient;
var __dirname = dirname(fileURLToPath(import.meta.url));
var prisma = new PrismaClient();
// let links: Link[] = [
//   {
//     id: 'link-0',
//     url: 'www.howtographql.com',
//     description: 'Solid learning resources for GraphQL'
//   }
// ]
var resolvers = {
    Query: {
        info: function () { return "A news site for getting helpful links"; },
        // retrieve all links
        feed: function (parent, args, context) { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, context.prisma.link.findMany()];
            });
        }); },
        // retrieve a single link
        link: function (parent, args, context) { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, context.prisma.link.findUnique({
                        where: { id: Number(args.id) }
                    })];
            });
        }); }
    },
    Mutation: {
        // create a link
        post: function (parent, args, context) {
            var newLink = context.prisma.link.create({
                data: {
                    url: args.url,
                    description: args.description
                }
            });
            return newLink;
        },
        // update a link
        updateLink: function (parent, args, context) { return __awaiter(void 0, void 0, void 0, function () {
            var updateObj;
            return __generator(this, function (_a) {
                updateObj = {};
                if (args.url)
                    updateObj.url = args.url;
                if (args.description)
                    updateObj.description = args.description;
                return [2 /*return*/, context.prisma.link.update({
                        where: { id: Number(args.id) },
                        data: __assign({}, updateObj)
                    })];
            });
        }); },
        // delete a link
        deleteLink: function (parent, args, context) { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, context.prisma.link.delete({
                        where: { id: Number(args.id) }
                    })];
            });
        }); }
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
