import Layout from '../components/Layout';
import { SessionProvider } from 'next-auth/react' 
import { Toaster } from 'react-hot-toast'
import '../styles/globals.css'


function MyApp({ 
  Component, 
  pageProps: { session, ...pageProps } }) {
  return (
    <>
      <SessionProvider session={session}>
        <Layout>
          <Component {...pageProps} /> 
        </Layout> 
      </SessionProvider>

      <Toaster />
    </>
  )
}

export default MyApp;
