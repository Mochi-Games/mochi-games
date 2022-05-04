import Image from 'next/image';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

function Thumbnail({ result }) {
  console.log('result', result);
  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        '& > :not(style)': {
          m: 1,
          width: 200,
          height: 140,
        },
      }}
    >
      <Paper>
        <Image
          layout="responsive"
          src={result.background_image}
          height={720}
          width={1280}
        />
        <h2>{result.name}</h2>
      </Paper>
    </Box>
  );
}

export default Thumbnail;
