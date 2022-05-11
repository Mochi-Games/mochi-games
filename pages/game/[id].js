import { Container, Rating, TextField, Typography } from '@mui/material';
import { style } from '@mui/system';
import { Prisma } from '@prisma/client';
import axios from 'axios';
import { server } from '../../utils';
import { useState } from 'react';

const API_KEY = process.env.API_KEY;

// const styles = {
//   background:
//     'linear-gradient(to right, #14181c 0%, rgba(255, 255, 255, 0) 40%), linear-gradient(to left, #14181c 0%, rgba(255, 255, 255, 0) 40%), linear-gradient(to top, #14181c 30%, rgba(255, 255, 255, 0) 80%)',
// };

function GamePage({ game }) {
  const [value, setValue] = useState(2);
  //   const [comment, setComment] = useState('');
  //   const [rating, setRating] = useState('');

  //   const submitHandler = async (e) => {
  //     // create api endpoint to create a review and send a post req
  //     e.preventDefault();
  //     try {
  //       const body = { comment, rating };
  //       await axios('/api/create', {
  //         method: 'POST',
  //         headers: { 'Content-Type': 'application/json' },
  //         body: JSON.stringify(body),
  //       });
  //     } catch (err) {
  //       console.log(err.response.data);
  //     }
  //   };

  //   const resetInputFields = () => {
  //     setTimeout(() => {
  //       setComment('');
  //       setRating('');
  //     }, 3000);
  //   };

  //   console.log('gamepageresults', game);
  return (
    <div>
      <Typography variant="h3" gutterBottom component="div">
        {game.name}
      </Typography>

      <img style={{ width: '100%' }} src={game.background_image} alt="" />

      <Rating
        name="simple-controlled"
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      />
      <TextField
        required
        id="outlined-required"
        label="Required"
        defaultValue="Hello World"
      />
      {/* <form onSubmit={submitHandler}>
        <input
          type="text"
          placeholder="What did you think of this game?"
          onChange={(e) => setComment(e.target.value)}
          value={comment}
        />
        <input
          type="number"
          min="1"
          max="5"
          placeholder="how many stars out of 5"
          onChange={(e) => setRating(e.target.value)}
          value={rating}
        />
        <input type="submit" value="Submit" onClick={resetInputFields} />
      </form> */}
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
