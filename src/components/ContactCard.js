import { Avatar, Tab} from "@mui/joy";

function ContactCard({contact}) {

  return (
  
      <Tab key={contact._id} sx={{ minWidth: 270 }}>
        <Avatar key={contact._id} src={`${contact?.avatarImg}`} sx={{ mr:1 }}>
          {contact.avatarImg ? contact.avatar : contact.names[0]}
        </Avatar>
        {contact.names}
      </Tab>

  );
}

export default ContactCard;

