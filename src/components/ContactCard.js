import { Avatar, Badge, Tab } from "@mui/joy";
import { useSelector } from "react-redux";

function ContactCard({ contact }) {
  const onlineUsers = useSelector((state) => state.auth.onlineUsers);
  const onlineUser = Object.values(onlineUsers).includes(contact._id);

  return (
    <Tab key={contact._id} sx={{ minWidth: 270 }}>
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

      {contact.names}
    </Tab>
  );
}

export default ContactCard;
