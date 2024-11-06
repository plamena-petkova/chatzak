import { Avatar, Box, Button, Grid, Typography } from "@mui/joy";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import Divider from "@mui/joy/Divider";
import PersonIcon from "@mui/icons-material/Person";
import UserList from "./UserList";
import {
  blockUserById,
  getUserById,
  unblockUserById,
} from "../store/authReducer";
import { useSocket } from "../App";

function UsersComponent() {
  const dispatch = useDispatch();

  const socket = useSocket();

  const allUsers = useSelector((state) => state.auth.allUsers);
  const currentUser = useSelector((state) => state.auth.user);
  const [currentContact, setCurrentContact] = useState(allUsers[0]);

  const [isBlocked, setIsBlocked] = useState(
    currentUser.blockedUsers?.includes(currentContact._id)
  );

  const handleCurrentContact = (contact) => {
    setCurrentContact(contact);
    setIsBlocked(currentUser.blockedUsers?.includes(contact._id));
  };

  const onBlockUser = async () => {
    const data = { user: currentUser, blockedUser: currentContact };
    try {
      await dispatch(blockUserById(data));
      setIsBlocked(true);
      dispatch(getUserById(currentUser._id));
      socket.emit("block-user", data);
    } catch (e) {
      console.error("Error", e);
    }
  };

  const onUnblockUser = async () => {
    const data = { user: currentUser, blockedUser: currentContact };
    try {
      await dispatch(unblockUserById(data));
      setIsBlocked(false);
      await dispatch(getUserById(currentUser._id));
      socket.emit("unblock-user", data);
    } catch (e) {
      console.error("Error", e);
    }
  };

  return (
    <Grid container sx={{ height: "100%" }}>
      <Grid xs={12} md={4}>
        <UserList
          headerText={"Users"}
          currentContactSelect={handleCurrentContact}
        />
      </Grid>
      <Grid xs={12} md={8}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyItems: "center",
            alignItems: "center",
            padding: 1,
            margin: 2,
          }}
        >
          <Avatar
            sx={{ marginBottom: 2, width: "180px", height: "190px" }}
            key={currentContact._id}
            src={`${currentContact.avatarImg}`}
          >
            {currentContact && currentContact.avatarImg
              ? currentContact.avatar
              : currentContact.names}
          </Avatar>
          <Typography sx={{ fontSize: "xl", fontWeight: 700, marginBottom: 2 }}>
            {currentContact.names}
          </Typography>
          <Divider />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "start",
            paddingLeft: 3,
            marginLeft: 3,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "start",
              alignItems: "center",
            }}
          >
            <PersonIcon sx={{ marginRight: 1 }} />
            <Typography sx={{ fontSize: "xl", fontWeight: 700 }}>
              About
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "start",
              marginTop: 1,
              marginBottom: 1,
            }}
          >
            <Typography sx={{ fontSize: "md", fontWeight: 300 }}>
              Name
            </Typography>
            <Typography sx={{ fontSize: "md", fontWeight: 500 }}>
              {currentContact.names}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "start",
              marginTop: 1,
              marginBottom: 1,
            }}
          >
            <Typography sx={{ fontSize: "md", fontWeight: 300 }}>
              Username
            </Typography>
            <Typography sx={{ fontSize: "md", fontWeight: 500 }}>
              {currentContact.username}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "start",
              marginTop: 1,
              marginBottom: 1,
            }}
          >
            <Typography sx={{ fontSize: "md", fontWeight: 300 }}>
              Email
            </Typography>
            <Typography sx={{ fontSize: "md", fontWeight: 500 }}>
              {currentContact.email}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-start",
              mt: 3,
            }}
          >
            <Button
              variant="solid"
              color="danger"
              sx={{ mr: 1 }}
              onClick={isBlocked ? onUnblockUser : onBlockUser}
            >
              {isBlocked ? "Unblock" : "Block"}
            </Button>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}

export default UsersComponent;
