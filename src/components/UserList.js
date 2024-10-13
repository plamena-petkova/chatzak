import { Input, List, Typography } from "@mui/joy";
import { useMediaQuery } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentChat } from "../store/chatReducer";
import ContactCard from "./ContactCard";

function UserList({headerText, currentContactSelect}) {

    const dispatch = useDispatch();

    const lastMessage = useSelector((state) => state.chat.lastMessage);
    const allUsers = useSelector((state) => state.auth.allUsers);
    const currentChat = useSelector((state) => state.chat.currentChat);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedContact, setSelectedContact] = useState(allUsers[0]);

    const isSmallScreen = useMediaQuery("(max-width:899px)");

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

      const handleChangeUser = (data) => {
        dispatch(setCurrentChat(data));
      };

      const handleSelectContact = (contact) => {
        currentContactSelect(contact);
        setSelectedContact(contact);
      }


  return (
    <>
      <Typography sx={{ fontSize: "xl", fontWeight: "700", mb: 2.5 }}>
        {headerText}
      </Typography>
      <Input
        onChange={(e) => handleSearch(e)}
        placeholder="Search..."
        variant="outlined"
      />
      {filteredUsers ? (
        <List
          orientation={isSmallScreen ? "horizontal" : "vertical"}
          sx={{
            width: isSmallScreen ? "100vw" : "auto",
            height: isSmallScreen ? "auto" : "87vh",
            overflow: "auto",
            bgcolor: "#F1F4F8",
            "&::-webkit-scrollbar": { maxWidth: "6px", maxHeight: "4px" },
            "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
              backgroundColor: headerText === "Chats" ? "#DDE7EE" : "#DDE7EE",
              minHeight: 3,
              minWidth: 3,
            },
            padding: 2,
          }}
        >
          {filteredUsers.map((contact) => {
            return (
              <ContactCard
                key={contact._id}
                contact={contact}
                lastMessage={
                  (lastMessage && headerText === 'Chats') ? lastMessage[contact._id]?.message?.text : null
                }
                selectedUser={headerText === 'Chats' ? handleChangeUser : ((contact) => handleSelectContact(contact))}
                selected={headerText === 'Chats' ? currentChat : selectedContact}
              />
            );
          })}
        </List>
      ) : (
        <Typography>No users found</Typography>
      )}
    </>
  );
}

export default UserList;
