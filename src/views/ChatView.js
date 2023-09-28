import { Box, Button, Grid, Input } from "@mui/joy";
import SideBar from "../components/SideBarContacts";
import Header from "../components/Header";
import SendIcon from "@mui/icons-material/Send";
import { useEffect, useState } from "react";
import { allUsersRoute } from "../utils/apiRoutes";
import axios from "axios";

function ChatView() {
  const [message, setMessage] = useState("");
  const [chatMessage, setChatMessage] = useState("");
  const [chatContacts, setChatContacts] = useState([]);

  const messageHandler = (event) => {
    setMessage(event.target.value);
  };

  const onSubmitMessage = (event) => {
    event.preventDefault();

    setChatMessage(message);
  };

  const fetchContacts = async () => {
    const contacts = await axios.get(allUsersRoute);
    setChatContacts(contacts);
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <Box sx={{ m: 3 }}>
      <Header />
      <Grid
        direction={"column"}
        justifyContent={"space-between"}
        alignItems={"stretch"}
      >
        <SideBar chatMessage={chatMessage} contacts={chatContacts} />

        <Input
          onChange={messageHandler}
          placeholder="Type your message..."
          endDecorator={
            <Button
              onClick={onSubmitMessage}
              variant="soft"
              endDecorator={<SendIcon />}
            ></Button>
          }
        />
      </Grid>
    </Box>
  );
}

export default ChatView;
