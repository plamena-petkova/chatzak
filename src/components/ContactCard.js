import { Avatar, Badge, Box, Tab, Typography } from "@mui/joy";
import { useSelector } from "react-redux";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import { useMediaQuery } from "@mui/material";


function ContactCard({ contact }) {

  const onlineUsers = useSelector((state) => state.auth.onlineUsers);
  const onlineUser = Object.values(onlineUsers).includes(contact._id);
  const currentChat = useSelector((state) => state.chat.currentChat);
  const newMessageIndicator = useSelector(
    (state) => state.chat.newMessageIndicator
  );
  const lastMessageChat = useSelector((state) => state.chat.lastMessage);

  const isSmallScreen = useMediaQuery("(max-width:899px)");


  //const statusMessage = lastMessageChat[contact.id]?.lastMessage?.message || lastMessageChat[currentChat._id]?.lastMessage?.message;

  return (
    <Tab
      key={contact._id}
      sx={
        isSmallScreen
          ? { maxWidth: 140, padding: "20px" }
          : { minWidth: 270, padding: "25px" }
      }
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
            {contact.avatarImg ? contact.avatar : contact.names[0]}
          </Avatar>
        </Badge>
      ) : (
        <Avatar key={contact._id} src={`${contact?.avatarImg}`} sx={{ mr: 1 }}>
          {contact.avatarImg ? contact.avatar : contact.names[0]}
        </Avatar>
      )}
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        {isSmallScreen ? contact.names.split(" ")[0] : contact.names}
        {contact._id === newMessageIndicator[contact._id]?.chatId &&
        newMessageIndicator[contact._id].show === true ? (
          <ChatBubbleOutlineOutlinedIcon
            sx={{ ml: 1, color: "red" }}
            fontSize="sm"
          />
        ) : null}
        
      </Box>
    </Tab>
  );
}

export default ContactCard;
/*
<Box>
          <Typography sx={{ fontSize: "12px" }}>{ lastMessageChat ? lastMessageChat[contact.id]?.lastMessage?.message: null}</Typography>
        </Box>
*/
