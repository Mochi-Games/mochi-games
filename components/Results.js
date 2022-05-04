import Thumbnail from './Thumbnail';

function Results({ results }) {
  console.log('results', results);
  return (
    <div className="px-5 mt-10 grid grid-cols-1 gap-y-10 gap-x-1 sm:grid-cols-2 lg:grid-cols-5 xl:gap-x-8">
      {results.map((result) => (
        <Thumbnail key={result.id} result={result} />
      ))}
    </div>
  );
}

export default Results;
