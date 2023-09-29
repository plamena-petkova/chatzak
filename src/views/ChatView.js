import { Box, Button, Card, Grid, Input } from "@mui/joy";
import SideBar from "../components/SideBarContacts";
import Header from "../components/Header";
import SendIcon from "@mui/icons-material/Send";
import { useEffect, useState } from "react";
import { allUsersRoute } from "../utils/apiRoutes";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setAllUsers } from "../store/authReducer";

function ChatView() {
  
  const dispatch = useDispatch()

  const user = useSelector((state) => state.auth.user);
  const allUsers = useSelector((state) => state.auth.allUsers);

  const [message, setMessage] = useState("");
  const [chatMessage, setChatMessage] = useState("");

  const messageHandler = (event) => {
    setMessage(event.target.value);
  };

  const onSubmitMessage = (event) => {
    event.preventDefault();

    setChatMessage(message);
  };

  const fetchContacts = async () => {
    const contacts = await axios.get(allUsersRoute);
    //console.log('Contacts', contacts.data.users);
    if(contacts.data) {
      dispatch(setAllUsers(contacts.data.users));
    }

  };

  useEffect(() => {
    fetchContacts();
  }, []);

  console.log('All users', allUsers);

  return (
    <Box sx={{ m: 3 }}>
      <Header />
      <Grid
        direction={"column"}
        justifyContent={"space-between"}
        alignItems={"stretch"}
      >
        <SideBar chatMessage={chatMessage} contacts={allUsers} />
        <Box>
        <Card sx={{maxWidth:150, height:30, mr:1}}>{user.names}</Card>
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
        </Box>
      </Grid>
    </Box>
  );
}

export default ChatView;
