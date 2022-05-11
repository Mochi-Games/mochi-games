// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import prisma from '../../lib/prisma';

export default async function handle(req, res) {
  const { comment, rating } = req.body;

  const result = await prisma.review.create({
    data: {
      comment: comment,
      rating: rating,
    },
  });

  res.json(result);
}
