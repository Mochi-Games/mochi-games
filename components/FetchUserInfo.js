import axios from "axios"

export default async function fetchUserInfo(email) {
  try {
  const res = await axios('/api/fetchUser', {
    method: 'GET',
    params: {
      email
    }
  })
  return res
  } catch (err) {
    console.log(err)
  }
}
