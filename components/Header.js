import HeaderItem from './HeaderItem';
import { HomeIcon, LoginIcon, LogoutIcon, SearchIcon, UserIcon } from '@heroicons/react/outline';
import mochigames from '../public/mochigames.png';
import Image from 'next/image';
import Link from 'next/link';
import AuthModal from './AuthModal';
import { useState } from 'react';
import {SessionProvider, signOut, useSession} from 'next-auth/react';
import save from './SaveUser';

function Header() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const session = useSession();
  const auth = session.status;
  console.log('session', session.data);

  async function saveUser(user) {
    const response = await fetch('/api/saveUser', {
      method: 'POST',
      body: JSON.stringify(user)
    })
    return await response.json()
  }
 
  return (
    <>
      <SessionProvider session={session}>
        <header className="flex flex-col sm:flex-row m-5 justify-between items-center h-auto">
          <div className="flex flex-grow justify-evenly max-w-2xl">
            <Link href="/">
              <a>
                <HeaderItem title="HOME" Icon={HomeIcon} />
              </a>
            </Link>
            <Link href="/search">
              <a>
                <HeaderItem title="SEARCH" Icon={SearchIcon} />
              </a>
            </Link>
            <Link href="/account">
              <a>
                <HeaderItem title="ACCOUNT" Icon={UserIcon} />
              </a>
            </Link>
            <nav>
              { auth === 'unauthenticated' ? (
                  <button onClick={handleOpen}> <HeaderItem title="LOG IN" Icon={LoginIcon} /> </button>
                ) : (
                <button onClick={signOut}> <HeaderItem title="LOG OUT"  Icon={LogoutIcon} /> </button>
                )
              }
            </nav>
          </div>
          <Link href="/">
            <a>
              {' '}
              <Image src={mochigames.src} width={'150%'} height={'100%'} />
            </a>
          </Link>
          { auth === 'authenticated' ? (<button onClick={saveUser(session.data.user)}>save user</button>) : null
          }
        </header>
        <AuthModal open={open} close={handleClose}/>
      </SessionProvider>
    </>
  );
}

function showAuth(log) {
  if (log = open)
  return
}
export default Header;
