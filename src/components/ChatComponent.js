/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Grid, Input, List, Typography } from "@mui/joy";
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
  const isLoadingDeleteEditMessage = useSelector((state) => state.chat.isLoadingDeleteMessage);

  const [message, setMessage] = useState("");
  const [arrivalMsg, setArrivalMsg] = useState("");
  const scrollableContainerRef = useRef(null);
  const [dataMessage, setDataMessage] = useState({});
  const [doScroll, setDoScroll] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const isSmallScreen = useMediaQuery("(max-width:899px)");

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

    setDoScroll(true);
  };

  const onDeleteHandler = (messageId) => {
    dispatch(deleteMessage(messageId));
    const data = {
      from: currentUser._id,
      to: currentChat._id,
      message: "Removed message",
    };
    socket.emit("edit-msg", data);

    setDoScroll(false);
  };

  const onEditHandler = (messageId, newMessage) => {
    dispatch(editMessage({ messageId, newMessage }));
    const data = {
      from: currentUser._id,
      to: currentChat._id,
      message: newMessage,
    };
    socket.emit("edit-msg", data);
    setDoScroll(false);
  };

  const handleChangeUser = (data) => {
    dispatch(setCurrentChat(data));
  }

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
    if (!currentChat) {
      dispatch(setCurrentChat(allUsers[0]));
    }
  }, []);

  useEffect(() => {
    if (currentChat._id) {
      setDoScroll(true);
      dispatch(getAllMessages({ from: currentUser._id, to: currentChat._id }));
    }
  }, [
    currentChat,
    currentUser,
    dispatch,
    message, 
    isLoadingDeleteEditMessage, 
    doScroll
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
    setDoScroll(true)
  }, [arrivalMsg]);

  useEffect(() => {
    if (scrollableContainerRef.current  && doScroll) {
      scrollableContainerRef.current.scrollTop =
        scrollableContainerRef.current.scrollHeight;
    }
  }, [handleSendMsg, doScroll]);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchQuery(value);
  };

  const filteredUsers = allUsers.filter(
    (user) =>
      user?.username?.toLowerCase().includes(searchQuery) ||
      user?.email?.toLowerCase().includes(searchQuery) ||
      user?.name?.toLowerCase().includes(searchQuery)
  );

  return (
    <Grid
      container
      direction={isSmallScreen ? "column" : "row"}
      sx={{ height: "100%", width: "100%", flexGrow: 1, overflow: "auto" }}
    >
      <Grid xs={12} md={4}>
      <Typography sx={{ fontSize: "xl", fontWeight: "700", mb: 2.5 }}>
          Chats
        </Typography>
        <Input
          onChange={(e) => handleSearch(e)}
          placeholder="Search..."
          variant="outlined"
        />
        {filteredUsers ? (<List
          orientation={isSmallScreen ? "horizontal" : "vertical"}
          sx={{
            width:isSmallScreen ? '100vw' :'auto',
            height:isSmallScreen ? 'auto' :'87vh',
            overflow: "auto",
            bgcolor: "#F1F4F8",
            "&::-webkit-scrollbar": { maxWidth: "6px", maxHeight: "4px" },
            "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
              backgroundColor: "#DDE7EE",
              minHeight: 3,
              minWidth: 3,
            },
            padding:2
          }}
        >
          {filteredUsers.map((contact) => {
            return (
              <ContactCard
                key={contact._id}
                contact={contact}
                lastMessage={
                  lastMessage ? lastMessage[contact._id]?.message?.text : null
                }
                selectedUser={handleChangeUser}
                selected={currentChat}
              />
            );
          })}
        </List> ):
        (
          <Typography>No users found</Typography>
        )}
      </Grid>
      <Grid xs={12} md={8} sx={{pl:2, pr:2}}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            minHeight: "100vh",
          }}
        >
          {!isSmallScreen && (
            <Box>
              <HeaderChatProfileUser chat={currentChat} />
            </Box>
          )}
          <Box
            ref={scrollableContainerRef}
            sx={{
              height: isSmallScreen ? "90vh" : "80vh",
              overflow: "auto",
              "&::-webkit-scrollbar": {
                maxWidth: "4px",
                maxHeight: "1px",
              },
              "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
                borderRadius: 6,
                backgroundColor: "#DDE7EE",
                minHeight: 3,
                minWidth: 3,
                border: "none",
              },
            }}
          >
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
          </Box>
          <Box>
            <ChatInput socket={socket} handleSendMsg={handleSendMsg} />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}

export default ChatComponent;
