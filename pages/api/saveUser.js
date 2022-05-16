import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async (req, res) => {
  const userData = JSON.parse(req.body);
  const savedUsers = await prisma.user.create({
    data: userData
  });

  res.json(savedUsers);
};








