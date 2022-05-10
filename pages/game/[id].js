import { Container } from '@mui/material';
import { style } from '@mui/system';
import axios from 'axios';
import { server } from '../../utils';

const API_KEY = process.env.API_KEY;

const styles = {
  background:
    'linear-gradient(to right, #14181c 0%, rgba(255, 255, 255, 0) 40%), linear-gradient(to left, #14181c 0%, rgba(255, 255, 255, 0) 40%), linear-gradient(to top, #14181c 30%, rgba(255, 255, 255, 0) 80%)',
};

function GamePage({ game }) {
  console.log('gamepageresults', game);
  return (
    <div>
      <img style={{ width: '100%' }} src={game.background_image} alt="" />

      {game.name}
    </div>
  );
}

export default GamePage;

export async function getStaticProps(context) {
  const { id } = context.params;
  const res = await axios(`${server}/${id}?key=${API_KEY}`);
  const game = res.data;

  return {
    props: { game },
  };
}

export async function getStaticPaths() {
  // const API_KEY = process.env.RAWG_API_KEY;
  const res = await axios(`${server}?key=${API_KEY}&page_size=6`);
  const games = res.data.results;
  // const request = await fetch(
  //   `https://api.rawg.io/api/games?key=${API_KEY}&page_size=6`
  // ).then((res) => res.json());
  const ids = games.map((game) => game.id);
  const paths = ids.map((id) => ({ params: { id: id.toString() } }));

  return {
    paths,
    fallback: false,
  };
}
