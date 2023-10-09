/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import {
  Box,
  Chip,
  TabList,
  TabPanel,
  Tabs,
} from "@mui/joy";
import Header from "../components/Header";
import { useEffect, useState, useRef } from "react";
import { host, sendMessageRoute } from "../utils/apiRoutes";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../store/authReducer";
import {
  getAllMessages,
  setCurrentChat,
} from "../store/chatReducer";
import ChatInput from "../components/ChatInput";
import { io } from "socket.io-client";
import ContactCard from "../components/ContactCard";
import { v4 as uuidv4 } from "uuid";


function ChatView() {
  const dispatch = useDispatch();
  const socket = useRef();

  const currentChat = useSelector((state) => state.chat.currentChat);
  const currentUser = useSelector((state) => state.auth.user);
  const messages = useSelector((state) => state.chat.messages);
  const allUsers = useSelector((state) => state.auth.allUsers);
  const isLoading = useSelector((state) => state.auth.isLoading);
  const users = allUsers.filter((user) => user._id !== currentUser._id);
  const [message, setMessage] = useState("");
  const [arrivalMsg, setArrivalMsg] = useState(null);
  const [editMessage, setEditMessage] = useState('');
  const scrollRef = useRef();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch, currentUser]);

  useEffect(() => {
    const data = {
      from: currentUser._id,
      to: currentChat._id,
    };
    dispatch(getAllMessages(data));
  }, [currentChat, message]);

  const handleSendMsg = async (msg) => {
    await axios.post(sendMessageRoute, {
      from: currentUser._id,
      to: currentChat._id,
      message: msg,
    });

    socket.current.emit("send-msg", {
      to: currentChat._id,
      from: currentUser._id,
      message: msg,
    });

    const msgs = [...msg];
    msgs.push({ fromSelf: true, message: msg });

    setMessage(msgs);
  };

  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentChat]);

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-receive", (msg) => {
        setArrivalMsg({ fromSelf: false, message: msg });
      });
    }
  }, [arrivalMsg, message]);

  useEffect(() => {
    arrivalMsg && setMessage((prev) => [...prev, arrivalMsg]);
  }, [arrivalMsg]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behaviour: "smooth" });
  }, [arrivalMsg]);

  const handleChange = (event, contactId) => {
    const currentChat = users[contactId];
    dispatch(setCurrentChat(currentChat));
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          mr: 4,
          ml: 4,
        }}
      >
        <Header />

        <Tabs
          onChange={handleChange}
          aria-label="Vertical tabs"
          orientation="vertical"
        >
          <TabList>
            {users.map((contact) => {
              return <ContactCard key={contact._id} contact={contact} />;
            })}
          </TabList>

          {users.map((contact, index) => {
            return (
              <TabPanel value={index} key={contact._id}>
                {messages.map((msg) => {
                  if (msg.fromSelf) {
                    return (
                      <Box
                        key={uuidv4()}
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          justifyItems: "center",
                          mt: 2,
                          mb: 2,
                          alignItems: "end",
                        }}
                      >
                        <Chip
                          label="primary"
                          color="primary"
                          variant="outlined"
                          >
                          {msg.message}
                        </Chip>
                      </Box>
                    );
                  } else {
                    return (
                      <Box
                        key={uuidv4()}
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          mt: 3,
                          mb: 3,
                        }}
                      >
                        <Chip
                          label="success"
                          color="success"
                          variant="outlined"
                        >
                          {msg.message}
                        </Chip>
                      </Box>
                    );
                  }
                })}
              </TabPanel>
            );
          })}
        </Tabs>
      </Box>
      <Box sx={{ mr: 3, ml: 3 }}>
        <ChatInput handleSendMsg={handleSendMsg} />
      </Box>
    </>
  );
}

export default ChatView;
