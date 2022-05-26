import Head from 'next/head';
import { server } from '../utils';
import axios from 'axios';
import Response from '../Response';
import { useRouter } from 'next/router';
import SearchResults from '../components/SearchResults';
import Pagination from '@mui/material/Pagination';
import { styled } from '@mui/material/styles';
import { useState } from 'react';

const API_KEY = process.env.RAWG_API_KEY;

const CustomPaginator = styled(Pagination)`
  .MuiPagination-text {
    color: #fff;
  }
`;

function Search({ results }) {
  const [page, setPage] = useState(1);
  console.log('results', results);
  const router = useRouter();

  function handlePagination(e, value) {
    setPage(value);
    router.push(`search?term=${router.query.term}&page=${value}`);
  }

  return (
    <>
      <Head>
        <title>{router.query.term} - Search </title>
      </Head>
      <p>Showing results for {router.query.term}</p>
      <SearchResults results={results} />
      <CustomPaginator
        color="primary"
        page={page}
        count={10}
        onChange={handlePagination}
      />
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
        `${server}?search=${context.query.term}&page=${context.query.page}&key=${API_KEY}`
      );
  const results = res.data;

  return {
    props: {
      results,
    },
  };
}
