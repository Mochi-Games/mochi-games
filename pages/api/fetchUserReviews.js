import prisma from './prisma'

export default async (req, res) => {
  const {id} = req.query
  const userReviews = await prisma.reviews.findMany({
    where: {
      userId: id
    }
  });

  res.json(userReviews);
};
