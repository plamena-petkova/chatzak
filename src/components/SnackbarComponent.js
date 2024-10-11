import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import { Button, Stack, Typography } from "@mui/joy";
import Alert from "@mui/material/Alert";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentChat } from "../store/chatReducer";

function SnackbarComponent({ handleClose, open, messageFromUser, onCloseHandler }) {
  const dispatch = useDispatch();

  const allUsers = useSelector((state) => state.auth.allUsers);

  const user = allUsers.find((user) => user?._id === messageFromUser?.chatId);

  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
      <Snackbar
        anchorOrigin={{ horizontal: "right", vertical: "top" }}
        open={open}
        autoHideDuration={10000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          <Typography>
            {" "}
            You have new message! Go to chat with
            <Button
              variant="soft"
              onClick={() => {
                dispatch(setCurrentChat(user));
                onCloseHandler()
              }}
            >
              {user?.names}
            </Button>
            !
          </Typography>
        </Alert>
      </Snackbar>
    </Stack>
  );
}
export default SnackbarComponent;
