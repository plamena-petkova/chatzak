import { Box, Input, List, ListItem, Typography } from "@mui/joy";
import ContactCard from "./ContactCard";
import { useSelector } from "react-redux";

function ChatsComponent({heightComponent}) {
  const allUsers = useSelector((state) => state.auth.allUsers);

  return (
    <Box sx={{width:'30vw', maxHeight:'90vh', overflow: 'auto'}}>
      <Typography sx={{fontSize:'xl', fontWeight:'700', mb:2.5}}>Chats</Typography>
      <Input placeholder="Search users or messages" variant="soft" />
      <List sx={{mt:5, }}>
        {allUsers.map((contact) => {
          return (
            <ListItem variant="plain" key={contact._id}>
              <ContactCard contact={contact} />
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
}

export default ChatsComponent;
