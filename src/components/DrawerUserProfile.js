import { Avatar, Box, Button, ButtonGroup, Divider, Drawer, Typography } from "@mui/joy";
import React, { useState } from "react";
import PersonIcon from "@mui/icons-material/Person";


function DrawerUserProfile({currentContact, open }) {
    const [state, setState] = useState({
        right: false,
      });
    
      const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
          return;
        }
    
        setState({ ...state, [anchor]: open });
      };
    
    const list = (anchor) => (
        <Box
          role="presentation"
          onClick={toggleDrawer(anchor, false)}
          onKeyDown={toggleDrawer(anchor, false)}
        >
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
        </Box>
      );

      return (
        <React.Fragment>
          <ButtonGroup variant="plain">
            {['right'].map((anchor) => (
              <Button key={anchor} onClick={toggleDrawer(anchor, true)}>
                 <PersonIcon />
              </Button>
            ))}
          </ButtonGroup>
          {['right'].map((anchor) => (
            <Drawer
              key={anchor}
              anchor={anchor}
              open={state[anchor]}
              onClose={toggleDrawer(anchor, false)}
            >
              {list(anchor)}
            </Drawer>
          ))}
        </React.Fragment>
      );
}

export default DrawerUserProfile;
