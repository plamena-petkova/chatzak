import WarningIcon from '@mui/icons-material/Warning';
import CloseIcon from '@mui/icons-material/Close';
import * as React from 'react';
import Box from '@mui/joy/Box';
import Alert from '@mui/joy/Alert';
import IconButton from '@mui/joy/IconButton';
import Button from '@mui/joy/Button';
import { deleteUserById } from '../store/authReducer';
import { useDispatch, useSelector } from 'react-redux';

export default function AlertDeleteComponent({ onClose }) {

    const dispatch = useDispatch();

    const currentUser = useSelector((state) => state.auth.user);


    const deleteHandler = () => {
        dispatch(deleteUserById(currentUser._id));
    }


  return (
    <Box sx={{ display: 'flex', gap: 2, width: '100%', flexDirection: 'column' }}>
      <Alert
        startDecorator={<WarningIcon />}
        variant="solid"
        color="danger"
        endDecorator={
          <React.Fragment>
            <Button onClick={deleteHandler} variant="solid" color="danger" sx={{ mr: 1 }}>
              Yes
            </Button>
            <IconButton onClick={onClose} variant="solid" size="sm" color="danger">
              <CloseIcon />
            </IconButton>
          </React.Fragment>
        }
      >
        Do you really want to delete your account?
      </Alert>
    </Box>
  );
}
