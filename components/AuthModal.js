import { signIn, signOut } from 'next-auth/react'
import { toast } from 'react-hot-toast'
// import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';


const signInWithTwitch = () => {
  toast.loading('Redirecting...');
  signIn('twitch', {
    callbackUrl: window.location.href,
  });
}

const signInWithGoogle = () => {
  toast.loading('Redirecting...');
  signIn('google', {
    callbackUrl: window.location.href,
  });
}

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

export default function AuthModal({open, close}) {
  const modal = (
    <div>
      <Modal
        open = {open}
        onClose={close}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <Button onClick={signInWithTwitch}>Sign in with Twitch</Button>
            <Button onClick={signInWithGoogle}>Sign in with Google</Button>
          </Typography>
          {/* <Typography> */}
            {/* <Button onClick={} */}
          {/* </Typography> */}
        </Box>
      </Modal>
    </div>
  );

return modal

}

