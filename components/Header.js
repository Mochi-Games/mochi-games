import HeaderItem from './HeaderItem';
import {
  HomeIcon,
  LoginIcon,
  LogoutIcon,
  SearchIcon,
  UserIcon,
} from '@heroicons/react/outline';
import mochigames from '../public/mochigames.png';
import SearchIconMUI from '@mui/icons-material/Search';
import Image from 'next/image';
import Link from 'next/link';
import AuthModal from './AuthModal';
import { Fragment, useState, useEffect, useRef } from 'react';
import { SessionProvider, signOut, useSession } from 'next-auth/react';
import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import { useRouter } from 'next/router';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

function Header() {
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  const session = useSession();
  const auth = session.status;
  // console.log('session', session.data);
  const searchInputRef = useRef(null);
  const router = useRouter();

  const search = (e) => {
    // e.preventDefault();
    if (e.key === 'Enter') {
      const searchTerm = searchInputRef.current.value;
      console.log(searchInputRef.current.value);

      if (!searchTerm) return;

      router.push(`/search?term=${searchTerm}`);
    }
  };

  async function saveUser(user) {
    const response = await fetch('/api/saveUser', {
      method: 'POST',
      body: JSON.stringify(user),
    });
    return await response.json();
  }

  useEffect(() => {
    if (auth === 'authenticated') {
      setUser(session.data.user);
    } else {
      setUser(null)
    }
    }, [auth])

  useEffect( () => {
    if (user) {
      saveUser(user)
    }
  }, [user])
  // console.log('user', user);

  return (
    <>
      <SessionProvider session={session}>
        <header className="flex flex-col sm:flex-row m-5 justify-between items-center h-auto">
          <div className="flex flex-grow justify-evenly max-w-2xl">
            <Link href="/">
              <a>
                {' '}
                <Image src={mochigames.src} width={200} height={100} />
              </a>
            </Link>
            {/* <Link href="/search"> */}
            <a>
              {/* <HeaderItem title="SEARCH" Icon={SearchIcon} /> */}
              <Search>
                <SearchIconWrapper></SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  // inputProps={{ 'aria-label': 'search' }}
                  inputRef={searchInputRef}
                  onKeyPress={search}
                />
                <SearchIconMUI onClick={search} />
              </Search>
            </a>
            {/* </Link> */}
          </div>
          <div className="flex flex-grow justify-evenly max-w-2xl">
            <Link href="/">
              <a>
                <HeaderItem title="HOME" Icon={HomeIcon} />
              </a>
            </Link>
            { user && <Link href={`/account/${user.name}`}>
              <a>
                <HeaderItem title="ACCOUNT" Icon={UserIcon}/>
              </a>
            </Link> }
            <nav>
              {auth === 'unauthenticated' ? (
                <button onClick={handleOpen}>
                  {' '}
                  <HeaderItem title="LOG IN" Icon={LoginIcon} />{' '}
                </button>
              ) : (
                <button onClick={signOut}>
                  {' '}
                  <HeaderItem title="LOG OUT" Icon={LogoutIcon} />{' '}
                </button>
              )}
            </nav>
          </div>
          {/* {auth === 'authenticated' ? (
            <button
              onClick={() => {
                saveUser(session.data.user);
              }}
            >
              save user
            </button>
          ) : null} */}
        </header>
        <AuthModal open={open} close={handleClose} />
      </SessionProvider>
    </>
  );
}

// function showAuth(log) {
//   if ((log = open)) return;
// }
export default Header;
