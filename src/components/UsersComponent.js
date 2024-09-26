import {
  Avatar,
  Box,
  Button,
  Input,
  List,
  ListItem,
  Typography,
} from "@mui/joy";
import { useSelector } from "react-redux";
import { useMediaQuery } from "@mui/material";
import { useState } from "react";

function UsersComponent() {
  const allUsers = useSelector((state) => state.auth.allUsers);
  const isSmallScreen = useMediaQuery("(max-width:899px)");

  const [searchQuery, setSearchQuery] = useState("");

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
    <Box sx={{maxWidth:'30vw'}}>
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
          maxHeight: "90vh",
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
                    }}
                    variant="plain"
                    key={contact._id}
                  >
                    <Avatar
                      key={contact._id}
                      src={`${contact?.avatarImg}`}
                      sx={{ mr: 1 }}
                    >
                      {contact.avatarImg ? contact.avatar : contact.names[0]}
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
    </Box>
  );
}

export default UsersComponent;
