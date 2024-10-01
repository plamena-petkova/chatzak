import {
  Avatar,
  Box,
  Button,
  Grid,
  Input,
  List,
  ListItem,
  Typography,
} from "@mui/joy";
import { useSelector } from "react-redux";
import { useMediaQuery } from "@mui/material";
import { useState } from "react";
import Divider from "@mui/joy/Divider";
import PersonIcon from "@mui/icons-material/Person";

function UsersComponent() {
  const allUsers = useSelector((state) => state.auth.allUsers);
  const isSmallScreen = useMediaQuery("(max-width:899px)");

  const [searchQuery, setSearchQuery] = useState("");
  const [currentContact, setCurrentContact] = useState(allUsers[0]);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchQuery(value);
  };

  const filteredUsers = allUsers.filter(
    (user) =>
      user?.username?.toLowerCase().includes(searchQuery) ||
      user?.email?.toLowerCase().includes(searchQuery) ||
      user?.name?.toLowerCase().includes(searchQuery)
  );

  return (
    <Grid container width={"85vw"}>
      <Grid size={4} md={4}>
        <Typography sx={{ fontSize: "xl", fontWeight: "700", mb: 2.5 }}>
          Users
        </Typography>
        <Input
          onChange={(e) => handleSearch(e)}
          placeholder="Search users..."
          variant="soft"
        />
        <Box
          sx={{
            height: "80vh",
            overflow: "auto",
            "&::-webkit-scrollbar": { width: "4px" },
            "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
              borderRadius: 6,
              backgroundColor: "#DDE7EE",
              minHeight: 24,
              border: "none",
            },
          }}
        >
          {filteredUsers ? (
            <List sx={{ mt: 5 }}>
              {filteredUsers.map((contact) => {
                return (
                  <ListItem variant="plain" key={contact._id}>
                    <Button
                      sx={{
                        alignContent: "start",
                        justifyContent: "start",
                        width: "30vw",
                        color:'black'
                      }}
                      variant="plain"
                      key={contact?._id}
                      onClick={() => {
                        setCurrentContact(contact);
                      }}
                    >
                      <Avatar
                        key={contact._id}
                        src={`${contact?.avatarImg}`}
                        sx={{ mr: 1 }}
                      >
                        {contact && contact.avatarImg
                          ? contact.avatar
                          : contact.names[0]}
                      </Avatar>

                      {isSmallScreen
                        ? contact.names.split(" ")[0]
                        : contact.names}
                    </Button>
                  </ListItem>
                );
              })}
            </List>
          ) : (
            <Typography>No users found</Typography>
          )}
        </Box>
      </Grid>
      <Grid
        size={8}
        md={8}
        sx={{ justifyContent: "center", alignItems: "center" }}
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
            sx={{ marginBottom: 2, width:'180px', height:'190px' }}
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
          <Box sx={{display:'flex', flexDirection:'row', justifyContent:'start', alignItems:'center'}}>
          <PersonIcon sx={{marginRight:1}} />
          <Typography sx={{ fontSize: "xl", fontWeight: 700 }}>
            About
          </Typography>
          </Box>
          <Box sx={{display:'flex', flexDirection:'column', justifyContent:'start', marginTop:1, marginBottom:1}}>
          <Typography sx={{ fontSize: "md", fontWeight: 300 }}>Name</Typography>
          <Typography sx={{ fontSize: "md", fontWeight: 500 }}>
            {currentContact.names}
          </Typography>
          </Box>
          <Box sx={{display:'flex', flexDirection:'column', justifyContent:'start', marginTop:1, marginBottom:1}}>
          <Typography sx={{ fontSize: "md", fontWeight: 300 }}>Username</Typography>
          <Typography sx={{ fontSize: "md", fontWeight: 500 }}>
            {currentContact.username}
          </Typography>
          </Box>
          <Box sx={{display:'flex', flexDirection:'column', justifyContent:'start', marginTop:1, marginBottom:1}}>
          <Typography sx={{ fontSize: "md", fontWeight: 300 }}>Email</Typography>
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