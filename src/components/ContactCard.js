import { Avatar, Badge, Box, Button, ListItem, Tab } from "@mui/joy";
import { useSelector } from "react-redux";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import { useMediaQuery } from "@mui/material";

function ContactCard({ contact }) {
  const onlineUsers = useSelector((state) => state.auth.onlineUsers);
  const onlineUser = Object.values(onlineUsers).includes(contact._id);
  const newMessageIndicator = useSelector(
    (state) => state.chat.newMessageIndicator
  );

  const isSmallScreen = useMediaQuery("(max-width:899px)");
  //sx={isSmallScreen ? { maxWidth: 140, padding:'20px' } : { minWidth: 270, padding:'25px' }}

  return (
    <Button
      sx={{alignContent:'start', justifyContent:'start', width:'30vw'}}
      variant="plain"
      key={contact._id}
      
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

      {isSmallScreen? contact.names.split(' ')[0] : contact.names}
      {contact._id === newMessageIndicator[contact._id]?.chatId &&
      newMessageIndicator[contact._id].show === true ? (
        <ChatBubbleOutlineOutlinedIcon
          sx={{ ml: 1, color: "red" }}
          fontSize="sm"
        />
      ) : null}
    </Button>
  );
}

export default ContactCard;
