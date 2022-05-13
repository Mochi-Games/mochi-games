import Header from './Header';
import { useSession } from 'next-auth/react'

function Layout({ children }) {
  const { data: session, status } = useSession();
  const user = session?.user;
  const isLoadingUser = status === 'loading';
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
}

export default Layout;
