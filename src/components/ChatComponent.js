/* eslint-disable react-hooks/exhaustive-deps */
import { Grid, TabList, TabPanel, Tabs } from "@mui/joy";
import { useEffect, useRef, useState } from "react";
import { sendMessageRoute } from "../utils/apiRoutes";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  createAvatar,
  fetchUsers,
  getUserById,
  setOnlineUsers,
} from "../store/authReducer";
import {
  deleteMessage,
  editMessage,
  getAllMessages,
  getLastMessages,
  setCurrentChat,
  setNewMessageIndicator,
} from "../store/chatReducer";
import ChatInput from "../components/ChatInput";
import ContactCard from "../components/ContactCard";
import { v4 as uuidv4 } from "uuid";
import { socket } from "../socket";
import MessageComponent from "./MessageComponent";
import { useMediaQuery } from "@mui/material";
import HeaderChatProfileUser from "./HeaderChatProfileUser";

function ChatComponent() {
  const dispatch = useDispatch();

  const currentChat = useSelector((state) => state.chat.currentChat);
  const currentUser = useSelector((state) => state.auth.user);
  const messages = useSelector((state) => state.chat.messages);
  const allUsers = useSelector((state) => state.auth.allUsers);
  const newMessageIndicator = useSelector(
    (state) => state.chat.newMessageIndicator
  );
  const lastMessage = useSelector((state) => state.chat.lastMessage);

  const [message, setMessage] = useState("");
  const [arrivalMsg, setArrivalMsg] = useState("");
  const [value, setValue] = useState(0);
  const scrollableContainerRef = useRef(null);
  const [messageDeleted, setMessageDeleted] = useState({
    id: "",
    deleted: true,
  });
  const [messageEdited, setMessageEdited] = useState({
    id: "",
    edited: true,
  });
  const [dataMessage, setDataMessage] = useState({});
  const [doScroll, setDoScroll] = useState(true);

  const isSmallScreen = useMediaQuery("(max-width:899px)");

  useEffect(() => {
    if (currentUser) {
      dispatch(getLastMessages({ userId: currentUser._id }));
    }
  }, [currentChat, arrivalMsg, message]);

  useEffect(() => {
    if (currentUser._id && !socket.connected) {
      socket.connect();
    }
    dispatch(fetchUsers());
  }, [currentUser, dispatch]);

  useEffect(() => {
    if (allUsers && allUsers[value]) {
      dispatch(setCurrentChat(allUsers[value]));
    }
  }, []);

  useEffect(() => {
    if (currentChat?._id === allUsers[value]?._id) {
      dispatch(getAllMessages({ from: currentUser._id, to: currentChat._id }));
    }
    if (
      messageDeleted.deleted === true &&
      currentChat?._id === allUsers[value]?._id
    ) {
      dispatch(getAllMessages({ from: currentUser._id, to: currentChat._id }));
    }
    if (
      messageEdited.edited === true &&
      currentChat?._id === allUsers[value]?._id
    ) {
      dispatch(getAllMessages({ from: currentUser._id, to: currentChat._id }));
    }
  }, [
    currentChat,
    message,
    currentUser,
    dispatch,
    doScroll,
    messageDeleted,
    value,
    messageEdited,
  ]);

  useEffect(() => {
    if (currentChat._id !== dataMessage.from) {
      dispatch(
        setNewMessageIndicator({ chatId: dataMessage.from, show: true })
      );
    }
    if (
      currentChat._id === newMessageIndicator[currentChat._id]?.chatId &&
      newMessageIndicator[currentChat._id]?.show === true
    ) {
      dispatch(
        setNewMessageIndicator({ chatId: currentChat._id, show: false })
      );
    }
    if (
      dataMessage.from &&
      newMessageIndicator[currentChat._id]?.show === true
    ) {
      dispatch(
        setNewMessageIndicator({ chatId: currentChat._id, show: false })
      );
      setDataMessage({});
    }
    if (dataMessage.from === currentChat._id) {
      setDataMessage({});
    }
  }, [currentChat, setDataMessage, dataMessage]);

  useEffect(() => {
    if (socket) {
      socket.on("msg-receive", (data) => {
        setDataMessage(data);
        setArrivalMsg({ fromSelf: false, message: data.message });
      });
      socket.on("msg-edited", (data) => {
        setArrivalMsg({ fromSelf: false, message: data });
      });
      socket.on("update-users", (users) => {
        dispatch(setOnlineUsers(users));
      });
    }

    if (!currentUser.avatarImg)
      dispatch(createAvatar({ currentUser }))
        .unwrap()
        .then(dispatch(getUserById(currentUser._id)));

    return () => {
      socket.off("msg-receive");
      socket.off("msg-edited");
      socket.off("update-users");
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (currentUser) {
      socket.emit("add-user", currentUser._id);
    }
  }, [currentChat]);

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

  const onDeleteHandler = (messageId) => {
    setMessageDeleted({ id: messageId, deleted: true });
    dispatch(deleteMessage(messageId));
    const data = {
      from: currentUser._id,
      to: currentChat._id,
      message: "Removed message",
    };
    socket.emit("edit-msg", data);

    setDoScroll(true);
  };

  const onEditHandler = (messageId, newMessage) => {
    setMessageEdited({ id: messageId, edited: true });
    dispatch(editMessage({ messageId, newMessage }));
    const data = {
      from: currentUser._id,
      to: currentChat._id,
      message: newMessage,
    };
    socket.emit("edit-msg", data);

    setDoScroll(true);
  };

  useEffect(() => {
    if (scrollableContainerRef.current && doScroll) {
      scrollableContainerRef.current.scrollTop =
        scrollableContainerRef.current.scrollHeight;
    }
  }, [handleSendMsg, doScroll]);

  return (
    <Grid
      container
      direction={isSmallScreen ? "column" : "row"}
      sx={{ height: "100%", width: "100%", flexGrow:1, overflow:'hidden' }}
    >
      <Grid item xs={12} md={12}>
        <HeaderChatProfileUser chat={currentChat} />
      </Grid>
      <Grid item xs={12} md={12}>
        <Tabs
          sx={{
            overflow: "auto",
            maxHeight: isSmallScreen ? "100vh" : "80vh",
            minHeight: isSmallScreen ? "100vh" : null,
            overflowY: "scroll",
            "&::-webkit-scrollbar": { width: "4px" },
            "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
              borderRadius: 6,
              backgroundColor: "#DDE7EE",
              minHeight: 24,
              border: "none",
            },
          }}
          onChange={handleChangeTab}
          aria-label="Vertical tabs"
          variant="scrollable"
          orientation={isSmallScreen ? "horizontal" : "vertical"}
          value={value}
          ref={scrollableContainerRef}
        >
          <TabList
            sticky="top"
            sx={{
              overflow: "auto",
              scrollSnapType: "x mandatory",
              minHeight: isSmallScreen ? "20vh" : null,
              "&::-webkit-scrollbar": { maxWidth: "4px", maxHeight: "1px" },
              "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
                borderRadius: 6,
                backgroundColor: "#DDE7EE",
                minHeight: 3,
                minWidth: 3,
                border: "none",
              },
            }}
            underlinePlacement={{ top: "bottom", bottom: "top" }["top"]}
          >
            {allUsers.map((contact) => {
              return (
                <ContactCard
                  key={contact._id}
                  contact={contact}
                  lastMessage={
                    lastMessage ? lastMessage[contact._id]?.message?.text : null
                  }
                />
              );
            })}
          </TabList>
          <TabPanel value={value} key={uuidv4()}>
            {messages.length > 0 &&
              messages.map((msg) => {
                if (msg.fromSelf) {
                  return (
                    <MessageComponent
                      key={uuidv4()}
                      msg={msg}
                      onDeleteHandler={onDeleteHandler}
                      onEditHandler={onEditHandler}
                      alignItems={"end"}
                    />
                  );
                } else {
                  return (
                    <MessageComponent
                      key={uuidv4()}
                      msg={msg}
                      onDeleteHandler={onDeleteHandler}
                      alignItems={"start"}
                    />
                  );
                }
              })}
          </TabPanel>
        </Tabs>
      </Grid>
      <Grid item xs={12} md={12}>
        <ChatInput socket={socket} handleSendMsg={handleSendMsg} />
      </Grid>
    </Grid>
  );
}

export default ChatComponent;
