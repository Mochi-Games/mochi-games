// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// import prisma from '../../lib/prisma';

import { PrismaClient } from '@prisma/client';
import { getSession } from 'next-auth/react';

const prisma = new PrismaClient();

export default async (req, res) => {
  const getUser = await prisma.user.findFirst({
    where: {
      email: req.body.email,
    },
  });
  console.log('userObj', getUser);
  const data = JSON.parse(req.body);
  console.log('data', data);
  // const session = await getSession({ req });
  const result = await prisma.review.create({
    data: {
      rating: data.rating,
      comment: data.comment,
      gameId: data.gameId,
      userId: getUser.id,
      id: data.id,
      // userId: {
      //   connect: {
      //     email: session?.user.email,
      //   },
      // },
    },
  });
  const updateUserReviews = await prisma.user.update({
    where: {
      id: getUser.id,
    },
    data: {
      reviews: {
        connect: {
          id: data.id,
        },
      },
    },
  });

  return res.json(result, updateUserReviews);
};
