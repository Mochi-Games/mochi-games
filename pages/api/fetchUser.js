// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();
import prisma from '../../lib/prisma';

export default async (req, res) => {
  const { email } = req.query;
  const savedUsers = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  res.json(savedUsers);
};
