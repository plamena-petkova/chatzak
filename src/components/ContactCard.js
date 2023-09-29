import { Avatar, Tab, TabList } from "@mui/joy";


function ContactCard ({contacts}) {


return (
<>
<TabList>
  
{contacts.map((contact) => {
    return  <Tab key={contact._id} sx={{minWidth:270}}><Avatar src={`${contact?.avatarImg}`} >{contact.avatarImg ? contact.avatar : contact.names[0]}</Avatar>{contact.names}</Tab>
  })}

</TabList>
  </>
)

}

export default ContactCard;

