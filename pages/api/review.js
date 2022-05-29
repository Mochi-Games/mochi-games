// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// import { PrismaClient } from '@prisma/client';

<<<<<<< Updated upstream
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
=======
// const prisma = new PrismaClient();
import prisma from "./prisma";
>>>>>>> Stashed changes

export default async (req, res) => {
  const data = JSON.parse(req.body);
  const result = await prisma.review.create({
    data,
  });
  res.json(result);
};
