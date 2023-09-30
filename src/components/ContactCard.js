import { KeyboardArrowRight } from "@mui/icons-material";
import { Avatar, Box, Card, CardContent, List, ListItem, ListItemButton, ListItemContent, ListItemDecorator, Tab, TabList } from "@mui/joy";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setCurrentChat } from "../store/chatReducer";

function ContactCard({ contacts, chatIdHandler }) {

  const dispatch = useDispatch();

  const onChangeChatHandler = (contactId) => {
    dispatch(setCurrentChat(contactId));
    console.log('Chat', contactId );
  }
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minWidth: 250 }}>
      {contacts.map((contact, index) => {
        return (
          <List
            sx={{ display: "flex", flexDirection: "row", mt: 1 }}
            value={index}
            key={contact._id}
          >
            <ListItem>
              <ListItemButton>
                <ListItemDecorator>
                  {" "}
                  <Avatar key={contact._id} src={`${contact?.avatarImg}`}>
                    {contact.avatarImg ? contact.avatar : contact.names[0]}
                  </Avatar>
                </ListItemDecorator>
                <ListItemContent onClick={onChangeChatHandler(contact._id)}> {contact.names}</ListItemContent>
              </ListItemButton>
            </ListItem>
          </List>
        );
      })}
    </Box>
  );
}

export default ContactCard;

/*
          <Avatar key={contact._id} src={`${contact?.avatarImg}`}>
            {contact.avatarImg ? contact.avatar : contact.names[0]}
          </Avatar>
          {contact.names}
          */

/*
      <TabList>
        {contacts.map((contact, index) => {
          return (
            <Tab
              value={index}
              key={contact._id}
              sx={{ minWidth: 270 }}
            >
              <Avatar src={`${contact?.avatarImg}`}>
                {contact.avatarImg ? contact.avatar : contact.names[0]}
              </Avatar>
              {contact.names}
            </Tab>
          );
        })}
      </TabList>
  */
