import { Box, Button, Card, Grid, Input } from "@mui/joy";
import SideBar from "../components/SideBarContacts";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import { allUsersRoute } from "../utils/apiRoutes";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setAllUsers } from "../store/authReducer";
import ChatInput from "../components/ChatInput";

function ChatView() {
  const dispatch = useDispatch();

  const [message, setMessage] = useState("");

  //const user = useSelector((state) => state.auth.user);
  const allUsers = useSelector((state) => state.auth.allUsers);

  const handleSendMsg = (msg) => {
    setMessage(msg);
  };

  const fetchContacts = async () => {
    const contacts = await axios.get(allUsersRoute);
    if (contacts.data) {
      dispatch(setAllUsers(contacts.data.users));
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <>
      <Box sx={{ m: 3, maxWidth: 270 }}>
        <Header />
        <Box sx={{display:'flex'}}>
          <SideBar contacts={allUsers} message={message} />
          <Box>

          </Box>
        </Box>
      </Box>
      <Box sx={{ m: 3 }}>
        <ChatInput handleSendMsg={handleSendMsg} />
      </Box>
    </>
  );
}

export default ChatView;
