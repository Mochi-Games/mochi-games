// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();
import prisma from '../../lib/prisma';

export default async (req, res) => {
  const userData = JSON.parse(req.body);
  const savedUsers = await prisma.user.create({
    data: userData,
  });
  console.log('savedUsers', savedUsers);
  res.json(savedUsers);
};
