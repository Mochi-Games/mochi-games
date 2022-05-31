import { useRouter } from 'next/router';
import SearchItem from './SearchItem';
import Link from 'next/link';

const ROUTE_POST_ID = 'game/[id]';

function SearchResults({ results, genreResults }) {
  const router = useRouter();

  const navigate = (id) =>
    router.push({
      pathname: ROUTE_POST_ID,
      query: { id },
    });
  return (
    <div>
      {results.results?.map((result) => (
        <div key={`game-${result.id}`} onClick={() => navigate(result.id)}>
          <SearchItem key={result.id} result={result} />
        </div>
      ))}
    </div>
  );
}

export default SearchResults;
