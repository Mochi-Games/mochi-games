import {
  Container,
  Rating,
  TextField,
  Typography,
  Card,
  CardMedia,
  IconButton,
  Box,
  Modal,
  Tooltip,
  ToggleButton,
} from '@mui/material';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CreateIcon from '@mui/icons-material/Create';
import CheckIcon from '@mui/icons-material/Check';
import { PrismaClient } from '@prisma/client';
import axios from 'axios';
import { server } from '../../utils';
import { useState } from 'react';
import styles from '/styles/Home.module.css';
import { SessionProvider, useSession } from 'next-auth/react';
import ReviewComp from '../../components/ReviewComp';

const API_KEY = process.env.RAWG_API_KEY;

const prisma = new PrismaClient();

// const styles = {
//   background:
//     'linear-gradient(to right, #14181c 0%, rgba(255, 255, 255, 0) 40%), linear-gradient(to left, #14181c 0%, rgba(255, 255, 255, 0) 40%), linear-gradient(to top, #14181c 30%, rgba(255, 255, 255, 0) 80%)',
// };

function GamePage({ game, allGameReviews }) {
  const [value, setValue] = useState(0);
  const [formData, setFormData] = useState({});
  const session = useSession();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const status = session.status;

  const [favorite, setFavorite] = useState(false);
  const [selected, setSelected] = useState(false);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  async function saveReview(e) {
    e.preventDefault();
    console.log(formData);
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
  console.log('review', allGameReviews);
  // console.log('session', session.data.user.email);

  return (
    <>
      <SessionProvider session={session}>
        <div>
          <div className={styles.image_wrapper}>
            <img src={game.background_image_additional} />
          </div>
          {/* <Typography variant="h3" gutterBottom component="div">
            {game.name}
          </Typography> */}
          <Container sx={{ display: 'flex', paddingTop: 50 }}>
            <Card sx={{ maxWidth: 300, maxHeight: 300 }}>
              <CardMedia
                component="img"
                height="300"
                image={game.background_image}
                alt={game.slug}
              />
              <Rating
                name="simple-controlled"
                // precision={0.5}
                value={value}
                onChange={(e, newValue) => {
                  setValue(newValue);
                  // setFormData({ ...formData, rating: +e.target.value });
                }}
              />
              <div display="flex" justifycontent="space-between">
                <Tooltip title="Favorite">
                  <ToggleButton
                    color="error"
                    value="heart"
                    selected={favorite}
                    onClick={() => {
                      setFavorite(!favorite);
                      // setFormData({ ...formData, favorite: true });
                    }}
                  >
                    <FavoriteIcon sx={{ '&:hover': { color: 'red' } }} />
                  </ToggleButton>
                </Tooltip>
                <Tooltip title="Played">
                  <ToggleButton
                    color="success"
                    value="check"
                    selected={selected}
                    onClick={() => {
                      setSelected(!selected);
                      // setFormData({ ...formData, played: true });
                    }}
                  >
                    <CheckCircleOutlineOutlinedIcon
                      sx={{ '&:hover': { color: 'green' } }}
                    />
                  </ToggleButton>
                </Tooltip>
                <Tooltip title="Review">
                  <IconButton onClick={handleOpen}>
                    <CreateIcon sx={{ '&:hover': { color: 'blue' } }} />
                  </IconButton>
                </Tooltip>
              </div>
            </Card>
            <Container sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography variant="h3" gutterBottom component="div">
                {game.name}
              </Typography>
              <Typography variant="h6">
                Released: {game.released} by {game.publishers[0].name}
              </Typography>
              <Typography variant="p" gutterBottom component="div">
                {game.description_raw}
              </Typography>
            </Container>
          </Container>
          <Container>
            <div>
              <Rating name="read-only" value={game.rating} readOnly />
              <Typography variant="p" gutterBottom component="div">
                {game.rating} avg
              </Typography>
            </div>
          </Container>
          {status === 'authenticated' ? (
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-reviewform"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <form className={styles.reviewform} onSubmit={saveReview}>
                  <Rating
                    name="simple-controlled"
                    value={value}
                    onChange={(e, newValue) => {
                      setValue(newValue),
                        setFormData({ ...formData, rating: +e.target.value });
                    }}
                  />
                  <ToggleButton
                    color="error"
                    value="heart"
                    selected={favorite}
                    onClick={() => {
                      setFavorite(!favorite),
                        setFormData({ ...formData, favorite: favorite });
                    }}
                  >
                    <FavoriteIcon sx={{ '&:hover': { color: 'red' } }} />
                  </ToggleButton>
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
                        email: session.data.user.email,
                      })
                    }
                  />
                  <button type="submit">Add review</button>
                </form>
              </Box>
            </Modal>
          ) : (
            <Modal open={open} onClose={handleClose}>
              <Box sx={style}>
                <p>Please log in to leave a review!</p>
              </Box>
            </Modal>
          )}
        </div>
        <Container sx={{ padding: 20 }}>
          <Typography variant="h5">Recent Reviews:</Typography>
          {allGameReviews.map((review, i) => (
            <ReviewComp review={review} key={i} />
          ))}
        </Container>
      </SessionProvider>
    </>
  );
}

export default GamePage;

export async function getServerSideProps(context) {
  const { id } = context.params;
  const res = await axios(`${server}/${id}?key=${API_KEY}`);
  const game = res.data;
  const allGameReviews = await prisma.review.findMany({
    // orderBy: {
    //   createdAt: 'desc',
    // },
    where: { gameId: game.id },
    // include: {
    //   select: {
    //     user: true,
    //   },
    // },
    //include: user
  });
  console.log('allreviews', allGameReviews);
  return {
    props: {
      game,
      allGameReviews: JSON.parse(JSON.stringify(allGameReviews)),
    },
  };
}

// export async function getStaticPaths() {
//   const res = await axios(`${server}?key=${API_KEY}&page_size=6`);
//   const games = res.data.results;
//   const ids = games.map((game) => game.id);
//   const paths = ids.map((id) => ({ params: { id: id.toString() } }));

//   return {
//     paths,
//     fallback: false,
//   };
// }
