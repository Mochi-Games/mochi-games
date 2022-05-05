import { useRouter } from 'next/router';

function GamePage() {
  const router = useRouter();
  return <div>{router.query.id}</div>;
}

export default GamePage;
