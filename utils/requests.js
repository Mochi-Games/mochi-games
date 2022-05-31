const RAWG_API_KEY = process.env.RAWG_API_KEY;

export default {
  fetchAction: {
    title: 'Action',
    url: `?genres=action&key=${RAWG_API_KEY}`,
  },
  fetchIndie: {
    title: 'Indie',
    url: `?genres=indie&key=${RAWG_API_KEY}`,
  },
  fetchAdventure: {
    title: 'Adventure',
    url: `?genres=adventur&key=${RAWG_API_KEY}`,
  },
  fetchRPG: {
    title: 'RPG',
    url: `?genres=role-playing-games-rpg&key=${RAWG_API_KEY}`,
  },
  fetchStrategy: {
    title: 'Strategy',
    url: `?genres=strategy&key=${RAWG_API_KEY}`,
  },
  fetchShooter: {
    title: 'Shooter',
    url: `?genres=shooter&key=${RAWG_API_KEY}`,
  },
  fetchSimulation: {
    title: 'Simulation',
    url: `?genres=simulation&key=${RAWG_API_KEY}`,
  },
  fetchPuzzle: {
    title: 'Puzzle',
    url: `?genres=puzzle&key=${RAWG_API_KEY}`,
  },
  fetchPlatformer: {
    title: 'Platformer',
    url: `?genres=platformer&key=${RAWG_API_KEY}`,
  },
  fetchFighting: {
    title: 'Fighting',
    url: `?genres=fighting&key=${RAWG_API_KEY}`,
  },
};
