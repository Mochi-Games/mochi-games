import Image from 'next/image';
import Paper from '@mui/material/Paper';
import Link from 'next/link';

function Thumbnail({ result }) {
  // console.log('result', result);
  return (
    <Link href={`/game/${result.id}`}>
      <div className="w-full rounded items-center cursor-pointer group hover:text-white">
        <Paper>
          <Image
            layout="responsive"
            src={result.background_image}
            height={720}
            width={1280}
          />
          <h2 className="opacity-0 group-hover:opacity-100 tracking-widest">
            {result.name}
          </h2>
        </Paper>
      </div>
    </Link>
  );
}

export default Thumbnail;
