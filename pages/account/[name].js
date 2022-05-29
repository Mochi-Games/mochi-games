// import Link from "next/link";
import AccountHeader from "../../components/AccountHeader";
import fetchUserInfo from "../../components/FetchUserInfo";
import { useSession } from "next-auth/react";
import { useState } from "react";
// import prisma from "../api/prisma";


export default function accountPage() {
  const { data: session } = useSession()
  const [promise, setPromise] = useState(null);
  const [image, setImage] = useState(null);
  const [name, setName] = useState(null);
  const [id, setId] = useState(null);
  const userInfo = {image, name, id}
  const fetchedData = async () => { if (session) {
    let temp = await fetchUserInfo(session.user.email);
<<<<<<< Updated upstream:pages/account.js
    setImage(temp.data.image);
    setName(temp.data.name);
=======
    if (temp.data != null) {
      // console.log('temp', temp);
      setId(temp.data.id);
      setImage(temp.data.image);
      setName(temp.data.name);
    }
    
>>>>>>> Stashed changes:pages/account/[name].js
    //pass review, follower from this page to other components.
    if (promise == null) {setPromise(temp)}}
  };
  fetchedData();
  if (session) {
  return (
    <>
      <div>
        <AccountHeader userInfo={userInfo} />
      </div>
    </>
  )
  } else {
    
    return (
      <>
        <h1>Log in to view this page!</h1>
      </>
    )
  }
}

// export async function getStaticPaths() {
//   return {
//     paths: [
//       { params: {
//         name
//       }}
//     ]
//   }
// }
// export async function getStaticProps() {
//   const reviews = await prisma.reviews.findMany({
//     where: {name}
//   })
//   return {
//     props: {
//       reviews: JSON.parse(JSON.stringify(reviews))
//     }
//   }
// }