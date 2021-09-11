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
function post(parent, args, context) {
    var newLink = context.prisma.link.create({
        data: {
            url: args.url,
            description: args.description
        }
    });
    return newLink;
}
function updateLink(parent, args, context) {
    var updateObj = {};
    if (args.url)
        updateObj.url = args.url;
    if (args.description)
        updateObj.description = args.description;
    return context.prisma.link.update({
        where: { id: Number(args.id) },
        data: __assign({}, updateObj)
    });
}
function deleteLink(parent, args, context) {
    return context.prisma.link.delete({
        where: { id: Number(args.id) }
    });
}
export { post, updateLink, deleteLink };
