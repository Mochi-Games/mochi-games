import { getProviders, signIn, signOut, useSession } from "next-auth/react"
import AuthModal from "../../../components/AuthModal";



const SignIn = ({ providers }) => {
  const res = useSession();
  // console.log(res.data)
  return (
    <>
    {/* <button onClick={() => signIn()}>
      Sign In
    </button> */}
      {providers && Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <button onClick={() => signIn(provider.id)}>
            Sign in with {provider.name}
          </button>
          <br></br>
          <button onClick={() => signOut()}>Sign Out</button>
        </div> 
      ))}
    </>
  )
}

export default SignIn

export async function getServerSideProps(context) {
  const providers = await getProviders()
  // console.log('providers', providers);
  return {
    props: { providers },
  }
}


