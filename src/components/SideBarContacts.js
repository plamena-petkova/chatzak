import { TabList, TabPanel, Typography } from "@mui/joy";
import ContactCard from "./ContactCard";
import Tabs from "@mui/joy/Tabs";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentChat } from "../store/chatReducer";

function SideBar() {
  const allUsers = useSelector((state) => state.auth.allUsers);

  const dispatch = useDispatch();

  const handleChange = (event, contactId) => {
    const currentChat = allUsers[contactId];
    dispatch(setCurrentChat(currentChat));
  } 

  const messages = useSelector((state) => state.chat.messages);

  console.log('SideBarMessage', messages);

  return (
    <Tabs
    onChange={handleChange}
      aria-label="Vertical tabs"
      orientation="vertical"
      sx={{ minWidth: 600, height: 200 }}
    >
      <TabList>
      {allUsers.map((contact) => {
        return  <ContactCard key={contact._id} contact={contact}/>
      })}
     </TabList>

      {allUsers.map((contact, index) => {
        return (
          <TabPanel value={index} key={contact._id} >
          {messages.map((msg) => {
            return <Typography key={Math.random(msg)}>{msg.message}</Typography>
          })}
          </TabPanel>
        );
      })}
    </Tabs>
  );
}

export default SideBar;

/*
    <Tabs
      aria-label="Vertical tabs"
      orientation="vertical"
      sx={{ minWidth: 600, height: 200 }}
    >
      <ContactCard contacts={contacts} />

      <TabPanel value={0}>{chatMessage}</TabPanel>
      <TabPanel value={1}>
        <b>Second</b> tab panel
      </TabPanel>
      <TabPanel value={2}>
        <b>Third</b> tab panel
      </TabPanel>
    </Tabs>

  */
