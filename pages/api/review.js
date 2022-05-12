// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// import prisma from '../../lib/prisma';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async (req, res) => {
  const data = JSON.parse(req.body);
  const result = await prisma.review.create({
    data,
  });

  res.json(result);
};
