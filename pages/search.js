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

function Search({ results }) {
  // console.log('results', results);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <SearchBar>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Search…"
          inputProps={{ 'aria-label': 'search' }}
          // onKeyPress={handleInput}
          // value={searchTerm}
        />
      </SearchBar>
    </Box>
  );
}

export default Search;

export async function getStaticProps(context) {
  const useDummyData = false;
  console.log('context', context);

  const res = await axios(`${server}?search=${context.query}&key=${API_KEY}`);
  const game = res.data;

  // console.log(game);
  return {
    props: {
      game,
      // allReviewsGame: JSON.parse(JSON.stringify(allReviewsGame)),
    },
  };
}
