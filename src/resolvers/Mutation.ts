type Link = {
  id: string,
  url: string,
  description: string
}

function post(parent: any, args: any, context: any): Link {

  const newLink = context.prisma.link.create({
    data: {
      url: args.url,
      description: args.description
    }
  })

  return newLink;
}

function updateLink(parent: any, args: any, context: any): Link {
  const updateObj: any = {};

  if (args.url) updateObj.url = args.url;
  if (args.description) updateObj.description = args.description;

  return context.prisma.link.update({
    where: { id: Number(args.id) },
    data: { ...updateObj }
  });
}

function deleteLink(parent: any, args: any, context: any): Link {
  return context.prisma.link.delete({
    where: { id: Number(args.id) } 
  });
}

export {
  post,
  updateLink,
  deleteLink
}