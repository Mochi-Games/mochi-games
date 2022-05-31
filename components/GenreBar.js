import requests from '../utils/requests';
import { Stack, Chip } from '@mui/material';
import { useRouter } from 'next/router';

function GenreBar() {
  const router = useRouter();

  return (
    <nav>
      <div className="flex px-10 space-x-10">
        {Object.entries(requests).map(([key, { title, url }]) => (
          <Stack direction="row" spacing={1}>
            <Chip
              label={title}
              color="primary"
              key={key}
              onClick={() => router.push(`/genre?genre=${key}`)}
            ></Chip>
          </Stack>
        ))}
      </div>
    </nav>
  );
}

export default GenreBar;
