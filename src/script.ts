import prismaClientPkg from '@prisma/client';
const { PrismaClient } = prismaClientPkg;

const prisma = new PrismaClient();

async function main() {
  const newLink = await prisma.link.create({
    data: {
      description: 'Fullstack tuts for GraphQL',
      url: 'www.howtographql.com'
    }
  })

  const allLinks = await prisma.link.findMany();
  console.log(allLinks);
}

main()
  .catch((error) => {
    throw error;
  })
  .finally(async () => {
    await prisma.$disconnect();
  })
