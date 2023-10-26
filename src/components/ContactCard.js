import { Avatar, Badge, Tab} from "@mui/joy";
import { useSelector } from "react-redux";

function ContactCard({contact}) {

  const onlineUsers = useSelector((state) => state.auth.onlineUsers);
  const online = onlineUsers.map((user) => user.userId);
  const onlineUser = online.includes(contact._id)


  return (
  
      <Tab key={contact._id} sx={{ minWidth: 270 }}>
        {onlineUser ?  <Badge><Avatar key={contact._id} src={`${contact?.avatarImg}`} sx={{ mr:1 }}>
          {contact.avatarImg ? contact.avatar : contact.names[0]}
        </Avatar></Badge> : <Avatar key={contact._id} src={`${contact?.avatarImg}`} sx={{ mr:1 }}>
          {contact.avatarImg ? contact.avatar : contact.names[0]}
        </Avatar>}
       
        {contact.names}
      </Tab>

  );
}

export default ContactCard;

