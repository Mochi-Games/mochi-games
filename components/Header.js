import HeaderItem from './HeaderItem';
import { HomeIcon, SearchIcon, UserIcon } from '@heroicons/react/outline';
import mochigames from '../public/mochigames.png';
import Image from 'next/image';

function Header() {
  return (
    <header className="flex flex-col sm:flex-row m-5 justify-between items-center h-auto">
      <div className="flex flex-grow justify-evenly max-w-2xl">
        <HeaderItem title="HOME" Icon={HomeIcon} />
        <HeaderItem title="SEARCH" Icon={SearchIcon} />
        <HeaderItem title="ACCOUNT" Icon={UserIcon} />
      </div>
      <Image src={mochigames.src} width={200} height={100} />
    </header>
  );
}

export default Header;
