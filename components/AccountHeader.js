import { getSession } from "next-auth/react";
import Link from "next/link";
import { useState, useEffect } from "react";
import UserReviews from "./UserReviews";
import UserGames from "./UserGames";
import UserNetwork from "./UserNetwork";
// import DisplayFavoriteGames from "./FavoriteGames";


export default function AccountPage({userInfo}) {
  const id = userInfo.id;
  const image = userInfo.image;
  const name = userInfo.name;

  const [showGames, setShowGames] = useState(false);
  const [showReviews, setShowReviews] = useState(false);
  const [showNetwork, setShowNetwork] = useState(false);

  function displayProfileDefault() {
    setShowGames(false);
    setShowReviews(false);
    setShowNetwork(false)
  }
  function displayGamesPlaylist() {
    setShowGames(true);
    setShowReviews(false);
    setShowNetwork(false)
  }
  function displayUserReviews() {
    setShowGames(false);
    setShowReviews(true);
    setShowNetwork(false)
  }
  function displayUserNetwork() {
    setShowGames(false);
    setShowReviews(false);
    setShowNetwork(true)
  }

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
            <li><button onClick={() => displayProfileDefault()}>Profile</button></li>
            <li><button onClick={() => displayGamesPlaylist()}>Games</button></li>
            <li><button onClick={() => displayUserReviews()}>Reviews</button></li>
            <li><button onClick={() => displayUserNetwork()}>Network</button></li>
          </ul>
        </div>
        <div id="reviewsContainer">
          {showReviews ? <UserReviews id={id}/> : null}
        </div>
        <div id="gamesContainer">
          {showGames ? <UserGames id={id}/> : null}
        </div>
        <div id="netWorkContainer">
          {showNetwork ? <UserNetwork id={id}/> : null}
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
  console.log('context', context)
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