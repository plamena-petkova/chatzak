import {
  Avatar,
  Box,
  Button,
  DialogActions,
  Divider,
  Modal,
  ModalDialog,
  Typography,
} from "@mui/joy";
import DrawerUserProfile from "./DrawerUserProfile";
import SearchBarMessages from "./SearchBarMessages";
import VideocamIcon from "@mui/icons-material/Videocam";
import { IconButton } from "@mui/joy";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../App";
import { setCurrentRoom } from "../store/chatReducer";

function HeaderChatProfileUser({
  chat,
  search,
  goNext,
  goPrevious,
  isBlocked,
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const socket = useSocket();

  const currentUser = useSelector((state) => state.auth.user);
  const onlineUsers = useSelector((state) => state.auth.onlineUsers);
  const onlineUser = Object.values(onlineUsers).includes(chat._id);

  const [openVideoCallModal, setOpenVideoCallModal] = useState(false);

  const handleCallMeeting = () => {
    const roomName = `${process.env.REACT_APP_JITSI_APP_ID}/Room-${currentUser._id}-${chat._id}`;
    setOpenVideoCallModal(false);
    const data = { to: chat, from: currentUser, roomName };
    dispatch(setCurrentRoom(roomName));
    socket.emit("call-user", data);
    if (roomName) {
      navigate(`/call/${roomName}`);
    }
  };

  return (
    <>
      {openVideoCallModal && (
        <Modal
          open={openVideoCallModal}
          onClose={() => setOpenVideoCallModal(!openVideoCallModal)}
        >
          <ModalDialog
            variant="outlined"
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Avatar size="lg" key={chat?._id} src={`${chat?.avatarImg}`}>
              {chat._id && chat?.avatarImg ? chat?.avatar : chat.names[0]}
            </Avatar>
            <Typography sx={{ fontWeight: "bold", fontSize: "20px" }}>
              {chat?.names}
            </Typography>
            <Typography>Start video call</Typography>

            <DialogActions>
              <IconButton
                variant="solid"
                color="success"
                onClick={handleCallMeeting}
              >
                <VideocamIcon />
              </IconButton>
              <IconButton
                variant="solid"
                color="danger"
                onClick={() => setOpenVideoCallModal(false)}
              >
                <CloseIcon />
              </IconButton>
            </DialogActions>
          </ModalDialog>
        </Modal>
      )}

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          m: 1,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            m: 1,
          }}
        >
          {chat?._id && (
            <Avatar key={chat?._id} src={`${chat?.avatarImg}`}>
              {chat._id && chat?.avatarImg ? chat?.avatar : chat.names[0]}
            </Avatar>
          )}

          <Typography sx={{ fontSize: 16, fontWeight: "bold", ml: 2 }}>
            {chat?.names}
          </Typography>
        </Box>
        {currentUser.blockedUsers?.includes(chat._id) ? (
          <Typography color="danger">You block this user</Typography>
        ) : null}
        {isBlocked ? (
          <Typography color="danger">You were blocked</Typography>
        ) : null}

        <Box
          sx={{ display: "flex", flexDirection: "row", flexWrap: "no-wrap" }}
        >
          <Box>
            {" "}
            <Button
              variant="plain"
              onClick={() => {
                setOpenVideoCallModal(!openVideoCallModal);
              }}
              disabled={!onlineUser}
            >
              <VideocamIcon sx={{ color: onlineUser ? "#0B0D0E" : "gray" }} />
            </Button>
          </Box>
          <SearchBarMessages
            searchMessages={search}
            goNext={goNext}
            goPrevious={goPrevious}
          />
          <DrawerUserProfile currentContact={chat} />
        </Box>
      </Box>

      <Divider />
    </>
  );
}

export default HeaderChatProfileUser;
