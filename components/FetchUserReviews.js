import axios from "axios"

export default async function fetchUserReviews(id) {
  try {
  const res = await axios('/api/fetchUserReviews', {
    method: 'GET',
    params: {
      id
    }
  })
  return res
  } catch (err) {
    console.log(err)
  }
}
