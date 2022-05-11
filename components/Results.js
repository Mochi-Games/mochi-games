import Thumbnail from './Thumbnail';
import { useRouter } from 'next/router';

const ROUTE_POST_ID = 'game/[id]';

function Results({ results }) {
  // console.log('results', results);
  const router = useRouter();

  const navigate = (id) =>
    router.push({
      pathname: ROUTE_POST_ID,
      query: { id },
    });

  return (
    <div className="container py-20 grid grid-cols-3 gap-2 mx-auto">
      {results.map((result) => (
        <div key={`game-${result.id}`} onClick={() => navigate(result.id)}>
          <Thumbnail key={result.id} result={result} />
        </div>
      ))}
    </div>
  );
}

export default Results;
