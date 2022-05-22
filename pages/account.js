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
    setImage(temp.data.image);
    setName(temp.data.name);
    //pass review, follower from this page to other components.
    if (promise == null) {setPromise(temp)}}
  };
  fetchedData();
  return (
    <>
      <div>
        <AccountHeader userInfo={userInfo} />
      </div>
    </>
  )

}