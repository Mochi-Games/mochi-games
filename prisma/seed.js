// import { reviews } from './reviews';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.review.create({
    data: {
      rating: 5,
      comment: 'fun game',
    },
  });
  await prisma.user.create({
    data: {
      email: 'geraltofrivia@witcher.com',
      name: 'Geralt',
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
