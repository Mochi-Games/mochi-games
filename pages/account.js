// import Link from "next/link";
import AccountHeader from "../components/AccountHeader";
import fetchUserInfo from "../components/FetchUserInfo";
import { useSession } from "next-auth/react";
import { useState } from "react";


export default function accountPage() {
  const { data: session } = useSession()
  const [promise, setPromise] = useState(null);
  const [image, setImage] = useState(null);
  const [name, setName] = useState(null);
  const userInfo = {image, name}
  const fetchedData = async () => { if (session) {
    let temp = await fetchUserInfo(session.user.email);
    if (temp.data != null) {
      console.log('temp', temp);
      setImage(temp.data.image);
      setName(temp.data.name);
    }
    
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