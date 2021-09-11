function info() {
    return 'A news site for getting helpful links';
}
function feed(parent, args, context) {
    return context.prisma.link.findMany();
}
function link(parent, args, context) {
    return context.prisma.link.findUnique({
        where: { id: Number(args.id) }
    });
}
export { info, feed, link };
