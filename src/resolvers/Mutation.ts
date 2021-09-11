import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { APP_SECRET, getUserId } from '../utils.js';

type Link = {
  id: string,
  url: string,
  description: string
}

// AUTH
async function signup(parent: any, args: any, context: any) {
  const password = await bcrypt.hash(args.password, 10);

  const user = await context.prisma.user.create({
    data: { ...args, password }
  });

  const token = jwt.sign({ userId: user.id }, APP_SECRET);

  return {
    token,
    user
  }
}


async function login(parent: any, args: any, context: any) {
  const user = await context.prisma.user.findUnique({
    where: { email: args.email }
  })

  if (!user) throw new Error('No such user found');

  const valid = await bcrypt.compare(args.password, user.password);

  if (!valid) throw new Error('Invalid password');

  const token = jwt.sign({ userId: user.id }, APP_SECRET);

  return {
    token,
    user
  }
}


function post(parent: any, args: any, context: any) {

  const { userId } = context;

  const newLink = context.prisma.link.create({
    data: {
      url: args.url,
      description: args.description,
      postedBy: { connect: { id: userId } }
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

export default {
  signup,
  login,
  post,
  updateLink,
  deleteLink
}