import Head from 'next/head';
import { server } from '../utils';
import axios from 'axios';
import Response from '../Response';
import { useRouter } from 'next/router';
import SearchResults from '../components/SearchResults';
import Pagination from '@mui/material/Pagination';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import { Container } from '@mui/material';
import GenreBar from '../components/GenreBar';
import requests from '../utils/requests';
import GenreResults from '../components/GenreResults';

const API_KEY = process.env.RAWG_API_KEY;

const CustomPaginator = styled(Pagination)`
  .MuiPagination-text {
    color: #fff;
  }
`;

function Search({ results, genreResults }) {
  const [page, setPage] = useState(1);
  // console.log('results', results);
  const router = useRouter();

  function handlePagination(e, value) {
    setPage(value);
    router.push(`search?term=${router.query.term}&page=${value}`);
  }

  const handleClick = () => {
    console.log('You clicked the Chip.');
  };

  return (
    <>
      <Head>
        <title>{router.query.term} - Search </title>
      </Head>
      <GenreBar />
      <p>Showing results for '{router.query.term}'</p>
      <GenreResults genre={genreResults} />
      <SearchResults results={results} />
      <Container sx={{ color: 'white' }}>
        <CustomPaginator
          color="primary"
          page={page}
          count={10}
          onChange={handlePagination}
        />
      </Container>
    </>
  );
}

export default Search;

export async function getServerSideProps(context) {
  const useDummyData = false;
  console.log('context', context.query);
  if (!context.query.page) {
    context.query.page = 1;
  }

  const res = useDummyData
    ? Response
    : await axios(
        `${server}?search=${context.query.term}&metacritic=80,100&page=${context.query.page}&key=${API_KEY}`
      );
  const results = res.data;

  const genre = context.query.genre;
  console.log('genre', context);

  // const genreRequest = await axios(
  //   `${server}${requests[genre]?.url}&key=${API_KEY}`
  // );
  // const genreResults = genreRequest.data;

  return {
    props: {
      results,
      // genreResults,
    },
  };
}
