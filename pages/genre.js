import React from 'react';
import requests from '../utils/requests';
import { server } from '../utils';
import axios from 'axios';
import GenreBar from '../components/GenreBar';
import SearchResults from '../components/SearchResults';

const API_KEY = process.env.RAWG_API_KEY;

function Genre({ genreResults }) {
  console.log('genreResults', genreResults);
  return (
    <div>
      <GenreBar />
      <SearchResults results={genreResults} />
    </div>
  );
}

export default Genre;

export async function getServerSideProps(context) {
  const genre = context.query.genre;

  const genreRequest = await axios(`${server}${requests[genre]?.url}`);
  const genreResults = genreRequest.data;

  return {
    props: {
      genreResults,
    },
  };
}
