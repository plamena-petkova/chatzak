/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Chip, TabList, TabPanel, Tabs } from "@mui/joy";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import { sendMessageRoute } from "../utils/apiRoutes";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { createAvatar, fetchUsers } from "../store/authReducer";
import { getAllMessages, setCurrentChat } from "../store/chatReducer";
import ChatInput from "../components/ChatInput";
import ContactCard from "../components/ContactCard";
import { v4 as uuidv4 } from "uuid";
import { socket } from "../socket";

function ChatView() {
  const dispatch = useDispatch();

  const currentChat = useSelector((state) => state.chat.currentChat);
  const currentUser = useSelector((state) => state.auth.user);
  const messages = useSelector((state) => state.chat.messages);
  const allUsers = useSelector((state) => state.auth.allUsers);
  const [message, setMessage] = useState("");
  const [arrivalMsg, setArrivalMsg] = useState("");
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (currentUser._id && !socket.connected) {
      socket.connect();
    }
  }, [currentUser]);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [currentUser, dispatch]);

  useEffect(() => {
    dispatch(createAvatar({ currentUser }));
  }, []);

  useEffect(() => {
    if (allUsers.length && allUsers[value]) {
      dispatch(setCurrentChat(allUsers[value]));
    }
  }, [allUsers]);

  useEffect(() => {
    const data = {
      from: currentUser?._id,
      to: currentChat?._id,
    };

    dispatch(getAllMessages(data));
  }, [currentChat, message, currentUser]);

  useEffect(() => {
    if (currentUser) {
      socket.emit("add-user", currentUser._id);
    }
  }, [currentChat]);

  useEffect(() => {
    if (socket) {
      socket.on("msg-receive", (msg) => {
        setArrivalMsg({ fromSelf: false, message: msg });
      });
    }

    return () => {
      socket.off("msg-receive");
    };
  }, []);

  useEffect(() => {
    arrivalMsg && setMessage((prev) => [...prev, arrivalMsg]);
  }, [arrivalMsg]);

  const handleChangeTab = (event, newValue) => {
    const currentChat = allUsers[newValue];
    setValue(newValue);
    dispatch(setCurrentChat(currentChat));
  };

  const handleSendMsg = async (msg) => {
    await axios.post(sendMessageRoute, {
      from: currentUser?._id,
      to: currentChat?._id,
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

  return (
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
        sx={{
          p: 1,
          overflowY: "auto",
        }}
        onChange={handleChangeTab}
        aria-label="Vertical tabs"
        variant="scrollable"
        orientation="vertical"
        value={value}
      >
        <TabList sticky={"top"}>
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
                  <Chip label="primary" color="primary" variant="outlined">
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
                  <Chip label="success" color="success" variant="outlined">
                    {msg.message}
                  </Chip>
                </Box>
              );
            }
          })}
        </TabPanel>
      </Tabs>
      <Box sx={{ mt: 2 }}>
        <ChatInput handleSendMsg={handleSendMsg} />
      </Box>
    </Box>
  );
}

export default ChatView;
