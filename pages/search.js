import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { Box, Typography } from '@mui/material';
import { useState, useRef } from 'react';
import { server } from '../utils';
import axios from 'axios';
import NextCors from 'nextjs-cors';

const API_KEY = process.env.RAWG_API_KEY;

const SearchBar = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.primary.light, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.primary.main, 0.25),
  },
  marginRight: 700,
  marginLeft: 0,
  marginTop: 20,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
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
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

function search() {
  const [searchResults, setSearchResults] = useState([]);
  const [formInputs, setFormInputs] = useState({});
  const [searchTerm, setSearchTerm] = useState('');

  // const searchEndpoint = (query) =>
  //   `${server}/?search=${query}?&key=${API_KEY}`;

  const handleInput = (e) => {
    let { name, value } = e.target;
    console.log(name, value);
    setFormInputs({ ...formInputs, [name]: value });
    setSearchTerm(e.target.value);
  };

  const search = async (req, res) => {
    e.preventDefault();
    await NextCors(req, res, {
      // Options
      methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
      origin: '*',
      optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    });
    res = await fetch(
      `${server}?search=${formInputs.searchTerm}&key=${API_KEY}`
    );
    console.log(res);
    res = await res.json();

    setSearchResults(res.results);
    console.log(res);
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* <SearchBar> */}
      {/* <SearchIconWrapper> */}
      {/* <SearchIcon /> */}
      {/* </SearchIconWrapper> */}
      {/* <StyledInputBase
          placeholder="Search…"
          inputProps={{ 'aria-label': 'search' }}
          onKeyPress={handleInput}
          // value={searchTerm}
        /> */}
      <form onSubmit={search}>
        <input
          className="search"
          name="searchTerm"
          value={searchTerm}
          onChange={handleInput}
          type="text"
          required
        />
        <button>search</button>
      </form>
      {/* </SearchBar> */}
    </Box>
  );
}

export default search;

// export async function getStaticProps(context) {
//   const res = await axios(`${server}?search=${context}&key=${API_KEY}`);
//   const game = res.data;

//   // console.log(game);
//   return {
//     props: {
//       game,
//       // allReviewsGame: JSON.parse(JSON.stringify(allReviewsGame)),
//     },
//   };
// }
