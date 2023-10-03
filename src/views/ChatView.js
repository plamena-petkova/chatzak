/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { Box, Button } from "@mui/joy";
import SideBar from "../components/SideBarContacts";
import Header from "../components/Header";
import { useEffect, useState, useRef } from "react";
import {
  allUsersRoute,
  getAllMessagesRoute,
  host,
  sendMessageRoute,
} from "../utils/apiRoutes";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { logout, setAllUsers } from "../store/authReducer";
import { setClearMessages, setMessages } from "../store/chatReducer";
import ChatInput from "../components/ChatInput";
import LogoutIcon from '@mui/icons-material/Logout';
import {io} from "socket.io-client";
import { useNavigate } from "react-router-dom";



function ChatView() {

  const socket = useRef();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const currentChat = useSelector((state) => state.chat.currentChat);
  const currentUser = useSelector((state) => state.auth.user);

  const [message, setMessage] = useState("");
  const [arrivalMsg, setArrivalMsg] = useState(null);
  const scrollRef = useRef();

  const handleSendMsg = async (msg) => {
   
      await axios.post(sendMessageRoute, {
        from: currentUser._id,
        to: currentChat._id,
        message: msg,
      });

 
    socket.current.emit("send-msg", {
      to: currentChat.id,
      from: currentUser.id,
      message: msg
    });

    const msgs = [...msg];
    msgs.push({fromSelf:true, message: msg });

    setMessage(msgs);
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
      to: currentChat._id,
    });
    if (messages.data) {
      dispatch(setMessages(messages.data));
    }
  };

  const triggerLogout = () => {
    dispatch(logout());
    dispatch(setClearMessages());
    navigate('/login');
    
  }

  useEffect(() => {
    getAllMessages();
   
  }, [currentChat,message]);

  useEffect(() => {
    if(currentUser) {
      socket.current = io(host);
      socket.current.emit("add-user", currentUser);
    }
  }, [currentChat])

  useEffect(() => {
    if(socket.current) {
      socket.current.on("msg-receive", (msg) => {
        setArrivalMsg({fromSelf: false, message: msg})
      })
    }
    fetchContacts();
  }, [message]);

  
  useEffect(() => {
   arrivalMsg && setMessage((prev) => [...prev, arrivalMsg]);

  }, [arrivalMsg]);

  useEffect(() => {
   scrollRef.current?.scrollIntoView({behaviour: "smooth"})
     
   }, [arrivalMsg]);

  return (
    <>
      <Box sx={{display:'flex', flexDirection:'column', justifyContent:'space-between', mr:4, ml:4, overflow: 'hidden'}}>
        <Header />
        <Button onClick={triggerLogout} variant="soft" endDecorator={<LogoutIcon />}></Button>
          <SideBar socket={socket} />
      </Box>
      <Box sx={{ mr: 3, ml: 3 }}>
        <ChatInput handleSendMsg={handleSendMsg} />
      </Box>
    </>
  );
}

export default ChatView;
