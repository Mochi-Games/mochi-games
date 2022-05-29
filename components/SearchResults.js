import { useRouter } from 'next/router';
import SearchItem from './SearchItem';
import Link from 'next/link';

const ROUTE_POST_ID = 'game/[id]';

function SearchResults({ results }) {
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
  //   const router = useRouter();

  //   const navigate = (id) =>
  //     router.push({
  //       pathname: ROUTE_POST_ID,
  //       query: { id },
  //     });

  //   return (
  //     <div className="container py-20 grid grid-cols-3 gap-2 mx-auto">
  //       {results.results.map((result) => (
  //         <div key={`game-${result.id}`} onClick={() => navigate(result.id)}>
  //           <Thumbnail key={result.id} result={result} />
  //         </div>
  //       ))}
  //     </div>
  //   );
}

export default SearchResults;
