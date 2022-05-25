import { getSession, useSession } from "next-auth/react";
import DisplayFavoriteGames from "./FavoriteGames";




export default function AccountPage({userInfo}) {

  const image = userInfo.image;
  const name = userInfo.name;
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
            <li>Games</li>
            <li>Likes</li>
            <li>Reviews</li>
            <li>Network</li>
          </ul>
        </div>
        <div></div>
        </div>
      </>
    )
  // }
  // return (
  //   <>
  //   <p> </p>
  //   <h1>Log in to view this page!</h1>
  //   </>
  // )
}

export async function getServerSideProps(context) {
  return {
    props: {
      session: await getSession(context)
    }
  }
}