import HeaderItem from './HeaderItem';
import { HomeIcon, SearchIcon, UserIcon } from '@heroicons/react/outline';
import mochigames from '../public/mochigames.png';
import Image from 'next/image';
import Link from 'next/link';
import AuthModal from './AuthModal';
import {Fragment, useState} from 'react';


function Header() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
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
          <button onClick={handleOpen}>Show Modal</button>
        </div>
        <Link href="/">
          <a>
            {' '}
            <Image src={mochigames.src} width={200} height={100} />
          </a>
        </Link>
      </header>
      <AuthModal open={open} close={handleClose}/>
    </>
  );
}

export default Header;
