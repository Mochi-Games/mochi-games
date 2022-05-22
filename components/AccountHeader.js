// import { getSession, useSession } from "next-auth/react";
// import { useState } from "react";
// import fetchUserInfo from "./FetchUserInfo";



export default function AccountPage({userInfo}) {
  // const { data: session } = useSession()
  // const [promise, setPromise] = useState(null);
  console.log(userInfo);
  const image = userInfo.image;
  const name = userInfo.name;
  // const fetchedData = async () => { if (session) {
  //   let temp = await fetchUserInfo(session.user.email);
  //   setImage(temp.data.image);
  //   setName(temp.data.name);
  //   //pass review, follower from this page to other components.
  //   if (promise == null) {setPromise(temp)}}
  // };
  // fetchedData();
  // console.log('promise', promise);
  // console.log('image', image);
  // if (session) {
    return(
      <>
      <div className="flex justify-items-center border">
        <img src={image} className='rounded-full'/>
        <>{/* display stats - friends, games reviewed, etc. */}</>
        <>{/* account navbar here */}</>
          <div className="">
            Welcome {name}! 
            {/* component for row display of recently reviewed games */}
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