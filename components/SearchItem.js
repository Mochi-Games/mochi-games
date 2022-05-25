import Image from 'next/image';
import Paper from '@mui/material/Paper';
import Link from 'next/link';

function SearchItem({ result }) {
  console.log(result.id);
  return (
    <Link href={`/game/[id]`} as={`/game/${result.slug}`}>
      <div>
        <h2>{result.name}</h2>
      </div>
    </Link>
  );
}

export default SearchItem;
