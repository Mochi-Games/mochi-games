import axios from "axios";

export default async function save(user) {
  // e.preventDefault();
  const response = await axios('/api/saveUser', {
    method: 'POST',
    body: JSON.stringify(user),
  });

  if (!response.ok) {
    throw new Error(response.statusText)
  }
  
  return await response.json();
}