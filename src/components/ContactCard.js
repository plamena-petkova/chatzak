import { Avatar, Badge, Box, Button, Typography } from "@mui/joy";
import { useSelector } from "react-redux";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import { useMediaQuery } from "@mui/material";



function ContactCard({ contact, lastMessage, selectedUser, selected }) {

  const onlineUsers = useSelector((state) => state.auth.onlineUsers);


  const onlineUser = Object.values(onlineUsers).includes(contact._id);
  const newMessageIndicator = useSelector(
    (state) => state.chat.newMessageIndicator
  );


  const isSmallScreen = useMediaQuery("(max-width:899px)");

  return (
    <Button
    sx={{
      alignContent: "start",
      justifyContent: "start",
      color: "black",
      background: (selected?._id === contact?._id) ? "#CADEF6" : "transparent",
    }}
    variant="plain"
      key={contact._id}
      onClick={() => {
        selectedUser(contact);
      }}

    >
      {onlineUser ? (
        <Badge
          badgeInset="14%"
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          size="sm"
        >
          <Avatar
            key={contact._id}
            src={`${contact?.avatarImg}`}
            sx={{ mr: 1 }}
          >
            {contact?.avatarImg ? contact.avatar : contact.names[0]}
          </Avatar>
        </Badge>
      ) : (
        <Avatar key={contact._id} src={`${contact?.avatarImg}`} sx={{ mr: 1 }}>
          {contact.avatarImg ? contact.avatar : contact.names[0]}
        </Avatar>
      )}
      <Box sx={{ display: "flex", flexDirection: "column", alignItems:'flex-start'}}>
        <Typography>{isSmallScreen ? contact.names.split(" ")[0] : contact.names}</Typography>
       
        <Box sx={{display:'flex', flexDirection:'row', justifyContent:'start', width:'70%'}}>
          <Typography noWrap sx={{ fontSize: "12px" }}>{lastMessage}</Typography>
          {contact._id === newMessageIndicator[contact._id]?.chatId &&
        newMessageIndicator[contact._id].show === true ? (
          <ChatBubbleOutlineOutlinedIcon
            sx={{ color: "red" }}
            fontSize="sm"
          />
        ) : null}
        </Box>
      </Box>
      
    </Button>
  );
}

export default ContactCard;
