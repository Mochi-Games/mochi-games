import {
  Container,
  Rating,
  TextField,
  Typography,
  Card,
  CardMedia,
  IconButton,
} from '@mui/material';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CreateIcon from '@mui/icons-material/Create';
import { style } from '@mui/system';
import { PrismaClient } from '@prisma/client';
import axios from 'axios';
import { server } from '../../utils';
import { useState } from 'react';
import styles from '/styles/Home.module.css';
import { SessionProvider, useSession } from 'next-auth/react';
import ReviewComp from '../../components/ReviewComp';
import { HeartBrokenOutlined } from '@mui/icons-material';

const API_KEY = process.env.RAWG_API_KEY;

const prisma = new PrismaClient();

// const styles = {
//   background:
//     'linear-gradient(to right, #14181c 0%, rgba(255, 255, 255, 0) 40%), linear-gradient(to left, #14181c 0%, rgba(255, 255, 255, 0) 40%), linear-gradient(to top, #14181c 30%, rgba(255, 255, 255, 0) 80%)',
// };

function GamePage({ game, allReviewsGame }) {
  const [value, setValue] = useState(0);
  const [formData, setFormData] = useState({});
  const session = useSession();
  const status = session.status;

  async function saveReview(e) {
    e.preventDefault();
    console.log(formData);
    // setMovies([...movies, formData]);
    const response = await fetch('/api/review', {
      method: 'POST',
      body: JSON.stringify(formData),
    });
    return await response.json();
  }
  //   const [comment, setComment] = useState('');
  //   const [rating, setRating] = useState('');

  //   const submitHandler = async (e) => {
  //     // create api endpoint to create a review and send a post req
  //     e.preventDefault();
  //     try {
  //       const body = { comment, rating };
  //       await axios('../api/create', {
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

  console.log('gamepageresults', game);
  return (
    <>
      <SessionProvider session={session}>
        <div>
          <Typography variant="h3" gutterBottom component="div">
            {game.name}
          </Typography>
          <img style={{ width: '100%' }} src={game.background_image} alt="" />
          {status === 'authenticated' ? (
            <form className={styles.reviewform} onSubmit={saveReview}>
              <Rating
                name="simple-controlled"
                precision={0.5}
                value={value}
                onChange={(e, newValue) => {
                  setValue(newValue),
                    setFormData({ ...formData, rating: +e.target.value });
                }}
              />
              <textarea
                name="comment"
                id=""
                cols="30"
                rows="10"
                placeholder="comment"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    comment: e.target.value,
                    gameId: game.id,
                  })
                }
              />
              <button type="submit">Add review</button>
            </form>
          ) : (
            <>Please log in to leave a review!</>
          )}
        </div>
        <div>
          <Typography variant="h5">Recent Reviews:</Typography>
          {allReviewsGame.map((review, i) => (
            <ReviewComp review={review} key={i} />
          ))}
        </div>
      </SessionProvider>
    </>
  );
}

export default GamePage;

export async function getStaticProps(context) {
  const { id } = context.params;
  const res = await axios(`${server}/${id}?key=${API_KEY}`);
  const game = res.data;
  const allReviewsGame = await prisma.review.findMany({
    // orderBy: {
    //   createdAt: 'desc',
    // },
    where: { gameId: game.id },
  });

  return {
    props: { game, allReviewsGame: JSON.parse(JSON.stringify(allReviewsGame)) },
  };
}

export async function getStaticPaths() {
  const res = await axios(`${server}?key=${API_KEY}&page_size=6`);
  const games = res.data.results;
  const ids = games.map((game) => game.id);
  const paths = ids.map((id) => ({ params: { id: id.toString() } }));

  return {
    paths,
    fallback: false,
  };
}
