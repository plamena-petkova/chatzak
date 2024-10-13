import {
  Avatar,
  Box,
  Grid,
  Typography,
} from "@mui/joy";
import { useSelector } from "react-redux";
import { useState } from "react";
import Divider from "@mui/joy/Divider";
import PersonIcon from "@mui/icons-material/Person";
import UserList from "./UserList";

function UsersComponent() {
  const allUsers = useSelector((state) => state.auth.allUsers);
  const [currentContact, setCurrentContact] = useState(allUsers[0]);

  const handleCurrentContact = (contact) => {
    setCurrentContact(contact);
  }

  return (
    <Grid container sx={{ height: "100%" }}>
      <Grid xs={12} md={4}>
        <UserList headerText={'Users'} currentContactSelect={handleCurrentContact} />
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
              ? currentContact?.avatar
              : currentContact?.names}
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
        </Box>
      </Grid>
    </Grid>
  );
}

export default UsersComponent;
