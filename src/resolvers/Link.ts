function postedBy(parent: any, args: any, context: any) {
  return context.prisma.link.findUnique({ where: { id: parent.id } }).postedBy();
}

export default { postedBy };