import { TabList, TabPanel, Typography } from "@mui/joy";
import ContactCard from "./ContactCard";
import Tabs from "@mui/joy/Tabs";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentChat } from "../store/chatReducer";
import { v4 as uuidv4 } from "uuid";

function SideBar() {
  const allUsers = useSelector((state) => state.auth.allUsers);

  const dispatch = useDispatch();

  const handleChange = (event, contactId) => {
    const currentChat = allUsers[contactId];
    dispatch(setCurrentChat(currentChat));
  };

  const messages = useSelector((state) => state.chat.messages);

  return (
    <Tabs
      onChange={handleChange}
      aria-label="Vertical tabs"
      orientation="vertical"
    >
      <TabList>
        {allUsers.map((contact) => {
          return <ContactCard key={contact._id} contact={contact} />;
        })}
      </TabList>

      {allUsers.map((contact, index) => {
        return (
          <TabPanel value={index} key={contact._id}>
            {messages.map((msg) => {
              return <Typography key={uuidv4()}>{msg.message}</Typography>;
            })}
          </TabPanel>
        );
      })}
    </Tabs>
  );
}

export default SideBar;
