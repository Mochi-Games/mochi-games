import Image from 'next/image';

import Link from 'next/link';
import { List, ListItem, ListItemText, Divider } from '@mui/material';
import noimage from '../public/no_image.jpeg';

function SearchItem({ result }) {
  return (
    <Link href={`/game/[id]`} as={`/game/${result.slug}`}>
      <List
        sx={{
          width: '100%',
          maxWidth: 360,
        }}
      >
        <ListItem>
          <ListItemText
            primary={`${result.name} (${result.released})`}
          ></ListItemText>
        </ListItem>

        {result.background_image && (
          <Image
            layout="responsive"
            src={
              `${result.background_image}` ||
              `${result.background_image_additional}`
            }
            height={720}
            width={1280}
            alt="no-image"
          />
        )}
        <Divider variant="inset" component="li" />
      </List>
    </Link>
  );
}

export default SearchItem;
