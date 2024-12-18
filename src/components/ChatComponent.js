/* eslint-disable react-hooks/exhaustive-deps */
import {
  Avatar,
  Box,
  Button,
  Grid,
  Modal,
  ModalDialog,
  Typography,
} from "@mui/joy";
import { useEffect, useRef, useState } from "react";
import { sendMessageRoute } from "../utils/apiRoutes";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  createAvatar,
  fetchUsers,
  getUserById,
  setBlockAlert,
  setOnlineUsers,
} from "../store/authReducer";
import {
  deleteMessage,
  editMessage,
  getAllMessages,
  getLastMessages,
  setCurrentChat,
  setCurrentIndex,
  setCurrentRoom,
  setIndexes,
  setIsMeetingActive,
  setNewMessageIndicator,
} from "../store/chatReducer";
import ChatInput from "../components/ChatInput";
import MessageComponent from "./MessageComponent";
import { DialogActions, useMediaQuery } from "@mui/material";
import HeaderChatProfileUser from "./HeaderChatProfileUser";
import UserList from "./UserList";
import { format, isSameDay } from "date-fns";
import { useSocket } from "../App";
import { useNavigate } from "react-router-dom";
import { ToastContainer} from "react-toastify"

function ChatComponent() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const socket = useSocket();

  const currentChat = useSelector((state) => state.chat.currentChat);
  const currentUser = useSelector((state) => state.auth.user);
  const messages = useSelector((state) => state.chat.messages);
  const allUsers = useSelector((state) => state.auth.allUsers);
  const newMessageIndicator = useSelector(
    (state) => state.chat.newMessageIndicator
  );
  const isLoadingDeleteEditMessage = useSelector(
    (state) => state.chat.isLoadingDeleteEditMessage
  );
  const searchString = useSelector((state) => state.chat.searchString);
  const currentIndex = useSelector((state) => state.chat.currentIndex);
  const blockAlert = useSelector((state) => state.auth.blockAlert);
  const currentRoom = useSelector((state) => state.chat.currentRoom)

  const [message, setMessage] = useState("");
  const [arrivalMsg, setArrivalMsg] = useState("");
  const scrollableContainerRef = useRef(null);
  const [dataMessage, setDataMessage] = useState({});
  const [doScroll, setDoScroll] = useState(true);
  const [arrayFoundMessages, setArrayFoundMessages] = useState([]);
  const [incomingCall, setIncomingCall] = useState({});
  const [incomingCallModal, setIncomingCallModal] = useState(false);

  const isSmallScreen = useMediaQuery("(max-width:899px)");

  const formatDate = (date) => format(new Date(date), "d MMMM yyyy");

  const handleSendMsg = async (msg) => {
    if (!socket || !currentChat || !currentUser) return;

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
    if (!socket || !currentChat || !currentUser) return;

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
    if (!socket || !currentChat || !currentUser) return;

    dispatch(editMessage({ messageId, newMessage }));
    const data = {
      from: currentUser._id,
      to: currentChat._id,
      message: newMessage,
    };
    socket.emit("edit-msg", data);
    setDoScroll(false);
  };

  useEffect(() => {
    if (currentUser) {
      dispatch(getLastMessages({ userId: currentUser._id }));
    }
  }, [currentChat, arrivalMsg, message]);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [currentUser, dispatch]);

  useEffect(() => {
    if (!currentChat._id) {
      dispatch(setCurrentChat(allUsers[0]));
    }
    dispatch(getAllMessages({ from: currentUser._id, to: currentChat._id }));
  }, [
    currentChat,
    currentUser,
    dispatch,
    message,
    isLoadingDeleteEditMessage,
    doScroll,
  ]);

  useEffect(() => {
    if (currentChat._id !== dataMessage.from) {
      dispatch(
        setNewMessageIndicator({
          chatId: dataMessage.from,
          show: true,
          messageObj: dataMessage,
        })
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
      socket.on("user-blocked", (data) => {
        dispatch(setBlockAlert(data));
      });
      socket.on("user-unblocked", (data) => {
        dispatch(setBlockAlert(""));
      });
      socket.on("call-received", (data) => {
        console.log("Data", data);
        setIncomingCall(data);
        setIncomingCallModal(true);
        dispatch(setCurrentRoom(data.roomName));
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
      socket.off("user-blocked");
      socket.off("call-received");
      socket.off("user-unblocked");
    };
  }, []);

  useEffect(() => {
    if (currentUser) {
      socket.emit("add-user", currentUser._id);
    }
  }, [currentChat]);

  useEffect(() => {
    arrivalMsg && setMessage((prev) => [...prev, arrivalMsg]);
    setDoScroll(true);
  }, [arrivalMsg]);

  useEffect(() => {
    if (scrollableContainerRef.current && doScroll) {
      scrollableContainerRef.current.scrollTop =
        scrollableContainerRef.current.scrollHeight;
    }
  }, [handleSendMsg, doScroll]);

  const messageRefs = useRef({}); // Store refs in the parent component

  const scrollToMessage = (msgId) => {
    const messageRef = messageRefs.current[msgId];
    if (messageRef) {
      setTimeout(() => {
        messageRef.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }, 0);
    } else {
      console.log("Message ref not found for ID:", msgId);
    }
  };

  const searchMessages = () => {
    let arrayMsgs = [];

    messages.forEach((msg, index) => {
      if (msg.message.toLowerCase().includes(searchString.toLowerCase())) {
        arrayMsgs.push({ msg, index });
      }
    });

    setArrayFoundMessages(arrayMsgs);

    if (arrayMsgs.length && searchString) {
      // Set to first result initially
      const firstIndex = 0;
      dispatch(setCurrentIndex(firstIndex));
      dispatch(setIndexes(arrayMsgs.length));

      // Scroll to the first message found
      scrollToMessage(arrayMsgs[firstIndex].msg.id);
    } else {
      // If no results found, reset the index to 0 and show that
      dispatch(setCurrentIndex(0));
      dispatch(setIndexes(0));
      console.log("No results found");
    }
  };

  const goToPreviousMessage = () => {
    if (currentIndex > 0) {
      const newIndex = currentIndex - 1;
      dispatch(setCurrentIndex(newIndex));
      scrollToMessage(arrayFoundMessages[newIndex].msg.id);
    } else {
      console.log("Already at the first message");
    }
  };

  const goToNextMessage = () => {
    if (currentIndex < arrayFoundMessages.length - 1) {
      const newIndex = currentIndex + 1;
      dispatch(setCurrentIndex(newIndex));
      scrollToMessage(arrayFoundMessages[newIndex].msg.id);
    } else {
      console.log("Already at the last message");
    }
  };

  // Assign ref when rendering messages
  const assignRef = (el, msgId) => {
    if (el && !messageRefs.current[msgId]) {
      messageRefs.current[msgId] = el;
    }
  };

  const acceptCall = () => {

    if (incomingCall) {
      dispatch(setIsMeetingActive(true));
      navigate("/call/" + currentRoom);
    }
  };

  const declineCall = () => {

    if (incomingCall) {
      dispatch(setIsMeetingActive(false));
      setIncomingCallModal(false);
    }
    return;
  };

  return (
    <Grid
      container
      direction={isSmallScreen ? "column" : "row"}
      sx={{ height: "100%", width: "100%", flexGrow: 1, overflow: "auto" }}
    >
      <Grid xs={12} md={4} sx={{ bgcolor: "#F1F4F8" }}>
        <UserList headerText={"Chats"} />
      </Grid>
      <Grid xs={12} md={8} sx={{ pl: 2, pr: 2 }}>
        <ToastContainer />
        {incomingCallModal && (
          <>
            <Modal
              open={incomingCallModal}
              onClose={() => setIncomingCallModal(!incomingCallModal)}
            >
              <ModalDialog
                variant="outlined"
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Avatar
                  size="lg"
                  key={incomingCall?.from._id}
                  src={`${incomingCall?.from?.avatarImg}`}
                >
                  {incomingCall?.from?._id && incomingCall?.from?.avatarImg
                    ? incomingCall?.from?.avatarImg
                    : incomingCall?.from?.names[0]}
                </Avatar>
                <Typography sx={{ fontWeight: "bold", fontSize: "20px" }}>
                  {incomingCall?.from?.names}
                </Typography>
                <Typography>Start video call</Typography>

                <DialogActions>
                  <Button onClick={acceptCall}>Accept</Button>
                  <Button onClick={declineCall}>Decline</Button>
                </DialogActions>
              </ModalDialog>
            </Modal>
          </>
        )}

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "100vh",
          }}
        >
          <Box>
            <HeaderChatProfileUser
              chat={currentChat}
              search={searchMessages}
              goNext={goToNextMessage}
              goPrevious={goToPreviousMessage}
              isBlocked={
                blockAlert?._id === currentUser?._id ||
                currentChat?.blockedUsers?.includes(currentUser._id)
              }
            />
          </Box>
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
              messages.map((msg, index) => {
                const currentMessageDate = new Date(msg.date);
                const previousMessageDate =
                  index > 0 ? new Date(messages[index - 1].date) : null;
                const showDateDivider =
                  !previousMessageDate ||
                  !isSameDay(currentMessageDate, previousMessageDate);

                return (
                  <MessageComponent
                    key={msg.id}
                    msg={msg}
                    onDeleteHandler={onDeleteHandler}
                    onEditHandler={onEditHandler}
                    alignItems={msg.fromSelf ? "end" : "start"}
                    dateDivider={showDateDivider}
                    currentDate={formatDate(msg?.date)}
                    index={index}
                    assignRef={assignRef} // Pass ref assignment function
                  />
                );
              })}
          </Box>
          <Box>
            <ChatInput
              socket={socket}
              handleSendMsg={handleSendMsg}
              isBlocked={
                currentUser.blockedUsers?.includes(currentChat._id) ||
                currentChat.blockedUsers?.includes(currentUser._id) ||
                blockAlert?._id === currentUser?._id ||
                currentChat?.blockedUsers?.includes(currentUser._id)
              }
              currentUser={currentUser}
            />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}

export default ChatComponent;
