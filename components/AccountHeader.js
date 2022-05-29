import { ThirtyFpsSelect } from "@mui/icons-material";
import { getSession } from "next-auth/react";
import Link from "next/link";
import { useState, useEffect } from "react";
import UserReviews from "./UserReviews";
// import DisplayFavoriteGames from "./FavoriteGames";


export default function AccountPage({userInfo}) {
  const [showGames, setShowGames] = useState(false);
  const [showReviews, setShowReviews] = useState(false);

  const id = userInfo.id;
  const image = userInfo.image;
  const name = userInfo.name;

  if (userInfo) {
    return(
      <>
      <div className="border">
        <div><img src={image} className='rounded-full'/>
          <div className="">
            Welcome {name}! 
            {/* component for row display of recently reviewed games */}
          </div>
        </div>
        <div className="">
          <ul className="flex flex-row justify-center space-x-12 border">
            <li><button>Profile</button></li>
            <li><button>Games</button></li>
            <li><button onClick={() => setShowReviews(true)}>Reviews</button></li>
            <li><button>Network</button></li>
          </ul>
        </div>
        <div id="container">
          {showReviews ? <UserReviews id={id}/> : null}
        </div>
        </div>
      </>
    )}
  return (
    <>
      {/* <p> </p> */}
      <h1>Log in to view this page!</h1>
    </>
  )
}

export async function getServerSideProps(context) {
  // const userGameReviews = await prisma.review.findMany({
  //   where: {id}
  // })
  // console.log(userGameReviews);
  return {
    props: {
      session: await getSession(context),
      // reviews: userGameReviews 
    }
  }
}