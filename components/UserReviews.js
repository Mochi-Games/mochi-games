import fetchUserReviews from "./FetchUserReviews";

export default function UserReviews({id}) {

  async function fetchReviews(id) {
    const reviews = await prisma.reviews.findMany({
      where: {userId: id}
    })
    return {
      props: {reviews}
    }
  }

  const res = fetchReviews(id);
  console.log('res', res);

  return (
    <div>
      Display of user reviews:
     
    </div>
  )
}