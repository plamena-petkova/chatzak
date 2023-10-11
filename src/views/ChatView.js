/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { Box, Chip, TabList, TabPanel, Tabs } from "@mui/joy";
import Header from "../components/Header";
import { useEffect, useState, useRef } from "react";
import { host, sendMessageRoute } from "../utils/apiRoutes";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../store/authReducer";
import { getAllMessages, setCurrentChat } from "../store/chatReducer";
import ChatInput from "../components/ChatInput";
import ContactCard from "../components/ContactCard";
import { v4 as uuidv4 } from "uuid";
import { socket } from "../socket";

function ChatView({isConnected}) {
  const dispatch = useDispatch();

  const currentChat = useSelector((state) => state.chat.currentChat);
  const currentUser = useSelector((state) => state.auth.user);
  const messages = useSelector((state) => state.chat.messages);
  const allUsers = useSelector((state) => state.auth.allUsers);
  const [message, setMessage] = useState("");
  const [arrivalMsg, setArrivalMsg] = useState('');
  const [editMessage, setEditMessage] = useState("");
  const [value, setValue] = useState(0);
  const scrollRef = useRef();

useEffect(() => {
  if(currentUser._id && !isConnected) {
    socket.connect();
  }
}, [currentUser])


  useEffect(() => {
    dispatch(fetchUsers());
  }, [currentUser, dispatch]);

  useEffect(() => {
    const data = {
      from: currentUser?._id,
      to: currentChat?._id,
    };

    dispatch(getAllMessages(data));

  }, [currentChat, message, currentUser]);

  const handleSendMsg = async (msg) => {
    await axios.post(sendMessageRoute, {
      from: currentUser._id,
      to: currentChat._id,
      message: msg,
    });

    socket.emit("send-msg", {
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
      socket.emit("add-user", currentUser._id);
    }
  }, [currentChat, currentUser]);

  useEffect(() => {
    if (socket) {   
        socket.on("msg-receive", (msg) => {
          setArrivalMsg({ fromSelf: false, message: msg });
        });
  
     
    }
  }, [arrivalMsg, message]);

  useEffect(() => {
    arrivalMsg && setMessage((prev) => [...prev, arrivalMsg]);
  }, [arrivalMsg, message]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behaviour: "smooth" });
  }, [arrivalMsg]);

  const handleChange = (event, newValue) => {
    const currentChat = allUsers[newValue];
    setValue(newValue);
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
          variant="scrollable"
          orientation="vertical"
          value={value}
        >
          <TabList>
            {allUsers.map((contact) => {
              return <ContactCard key={contact._id} contact={contact} />;
            })}
          </TabList>
              <TabPanel value={value} key={uuidv4()}>
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
   
      
        </Tabs>
      </Box>
      <Box sx={{ mr: 3, ml: 3 }}>
        <ChatInput handleSendMsg={handleSendMsg} />
      </Box>
    </>
  );
}

export default ChatView;
