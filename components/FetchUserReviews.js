import axios from "axios"

export default async function fetchUserReviews(id) {
  const res = await axios('/api/fetchUserReviews', {
    method: 'GET',
    params: {
      id
    }
  })
  return res
}
