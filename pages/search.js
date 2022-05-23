import Head from 'next/head';
import { server } from '../utils';
import axios from 'axios';
import Response from '../Response';
import { useRouter } from 'next/router';
import SearchResults from '../components/SearchResults';

const API_KEY = process.env.RAWG_API_KEY;

function Search({ results }) {
  console.log('results', results);
  const router = useRouter();
  return (
    <>
      <Head>
        <title>{router.query.term} - Search </title>
      </Head>
      <p>Showing results for {router.query.term}</p>
      <SearchResults results={results} />
    </>
  );
}

export default Search;

export async function getServerSideProps(context) {
  const useDummyData = false;
  console.log('context', context);

  const res = useDummyData
    ? Response
    : await axios(`${server}?search=${context.query.term}&key=${API_KEY}`);
  const results = res.data;

  return {
    props: {
      results,
    },
  };
}
