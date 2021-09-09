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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { ApolloServer } from 'apollo-server';
var __dirname = dirname(fileURLToPath(import.meta.url));
var linkIdCount = 0;
var links = [
    {
        id: 'link-0',
        url: 'www.howtographql.com',
        description: 'Solid learning resources for GraphQL'
    }
];
var resolvers = {
    Query: {
        info: function () { return "A news site for getting helpful links"; },
        // retrieve all links
        feed: function () { return links; },
        // retrieve a single link
        link: function (parent, args) {
            return links.find(function (link) { return link.id === "link-" + args.id; });
        }
    },
    Mutation: {
        // create a link
        post: function (parent, args) {
            linkIdCount++;
            var link = {
                id: "link-" + linkIdCount,
                description: args.description,
                url: args.url
            };
            links = __spreadArray(__spreadArray([], links, true), [link], false);
            return link;
        },
        // update a link
        updateLink: function (parent, args) {
            var updatedLink = { id: '', url: '', description: '' };
            var updatedLinks = links.map(function (link) {
                if (link.id !== "link-" + args.id)
                    return link;
                updatedLink = (__assign(__assign({}, link), { url: args.url, description: args.description }));
                return updatedLink;
            });
            links = updatedLinks;
            return updatedLink;
        },
        // delete a link
        deleteLink: function (parent, args) {
            var linkToDelete = links.find(function (link) { return link.id === "link-" + args.id; });
            var updatedLinks = links.filter(function (link) { return link.id !== "link-" + args.id; });
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
};
var server = new ApolloServer({
    typeDefs: fs.readFileSync(path.join(__dirname, 'schema.graphql'), 'utf8'),
    resolvers: resolvers
});
server
    .listen()
    .then(function (result) {
    console.log("Server is running on " + result.url);
});
