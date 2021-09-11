type Link = {
  id: string,
  url: string,
  description: string
}

function info(): string {
  return 'A news site for getting helpful links';
}

function feed(parent: any, args: any, context: any): Link[] {
  return context.prisma.link.findMany();
}

function link(parent: any, args: any, context: any): Link {
  return context.prisma.link.findUnique({ 
    where: { id: Number(args.id) } 
  });
}

export {
  info,
  feed,
  link
};