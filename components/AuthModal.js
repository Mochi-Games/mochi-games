import { SessionProvider, signIn, useSession } from 'next-auth/react'
import { toast } from 'react-hot-toast'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import save from './SaveUser'

const signInWithTwitch = async () => {
  toast.loading('Redirecting...');
  await signIn('twitch', {
    callbackUrl: window.location.href,
    });
  save(session.data.user);
  console.log('signed in with twitch')
}

const signInWithGoogle = () => {
  toast.loading('Redirecting...');
  signIn('google', {
    callbackUrl: window.location.href,
  });
}




const style = {
  position: 'absolute',
  top: '30%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function AuthModal({open, close}) {
  const session = useSession();
  console.log('sesh modal', session.data);

  const modal = (
    <div>
      <SessionProvider session={session}>
        <Modal
          open = {open}
          onClose={close}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              <Button onClick={signInWithTwitch}>Twitch</Button>
              <br></br>
              <Button onClick={signInWithGoogle}>Google</Button>
            </Typography>
            {/* <Typography> */}
              {/* <Button onClick={} */}
            {/* </Typography> */}
          </Box>
        </Modal>
      </SessionProvider>
    </div>
  );

return modal

}

