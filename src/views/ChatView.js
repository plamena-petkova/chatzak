import { Box } from "@mui/joy";
import SideBar from "../components/SideBarContacts";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import { allUsersRoute, getAllMessagesRoute, sendMessageRoute } from "../utils/apiRoutes";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setAllUsers } from "../store/authReducer";
import { setMessages } from "../store/chatReducer";
import ChatInput from "../components/ChatInput";

function ChatView() {
  const dispatch = useDispatch();

  const currentChat = useSelector((state) => state.chat.currentChat);
  const currentUser = useSelector((state) => state.auth.user);
 
  const [message, setMessage] = useState("");

  const handleSendMsg = async (msg) => {

    await axios.post(sendMessageRoute, {
      from: currentUser._id,
      to: currentChat._id,
      message: msg,
    });

    setMessage(msg);

  };



  const fetchContacts = async () => {
    const contacts = await axios.get(allUsersRoute);
    if (contacts.data) {
      dispatch(setAllUsers(contacts.data.users));
    }
  };

  const getAllMessages = async () => {
    const messages = await axios.post(getAllMessagesRoute, {
      from: currentUser._id,
      to: currentChat._id
    });
    if(messages.data) {
      dispatch(setMessages(messages.data))
    }
  }

  useEffect(() => {
    getAllMessages();
  }, [currentChat]);

  useEffect(() => {
    fetchContacts();
   
  }, []);

  return (
    <>
      <Box sx={{ m: 3, maxWidth: 270 }}>
        <Header />
        <Box sx={{ display: "flex" }}>
          <SideBar />
          <Box></Box>
        </Box>
      </Box>
      <Box sx={{ m: 3 }}>
        <ChatInput handleSendMsg={handleSendMsg} />
      </Box>
    </>
  );
}

export default ChatView;
