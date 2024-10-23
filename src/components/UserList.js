import {
  FormControl,
  FormHelperText,
  Input,
  List,
  ModalDialog,
  Typography,
} from "@mui/joy";
import {
  Box,
  Button,
  IconButton,
  Modal,
  TextField,
  useMediaQuery,
} from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentChat } from "../store/chatReducer";
import ContactCard from "./ContactCard";
import { sendEmailInvite } from "../store/authReducer";

function UserList({ headerText, currentContactSelect }) {
  const dispatch = useDispatch();

  const lastMessage = useSelector((state) => state.chat.lastMessage);
  const allUsers = useSelector((state) => state.auth.allUsers);
  const currentChat = useSelector((state) => state.chat.currentChat);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedContact, setSelectedContact] = useState(allUsers[0]);
  const [openModal, setOpenModal] = useState(false);
  const [messageEmail, setMessageEmail] = useState(
    "Hey! Join me on Chatzak: https://chatzak.netlify.app/register Let's chat!"
  );
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const isSmallScreen = useMediaQuery("(max-width:899px)");

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

  const handleChangeUser = (data) => {
    dispatch(setCurrentChat(data));
  };

  const handleSelectContact = (contact) => {
    currentContactSelect(contact);
    setSelectedContact(contact);
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleEmail = (e) => {
    if (!isValidEmail(e.target.value)) {
      setError(true);
      //addNotification("Type valid email address", types.error);
    } else {
      setError(false);
    }

    setEmail(e.target.value);
  };

  const handleMessageEmail = (e) => {
    setMessageEmail(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const senderMail = process.env.REACT_APP_SEND_INVITATION_EMAIL;
    const data = { messageEmail, email, senderMail };
    dispatch(sendEmailInvite(data));
    setOpenModal(!openModal)
    setError(false);
  };

  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }

  return (
    <>
      {openModal && (
        <Modal open={openModal} onClose={() => setOpenModal(!openModal)}>
          <ModalDialog sx={{ width: "50%", height: "55%" }}>
            <Box
              component="form"
              onSubmit={submitHandler}
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <Typography sx={{ fontSize: "35px" }}>Invite User</Typography>
              <Typography>Email</Typography>
              <FormControl error={error}>
                <Input placeholder="Email" onBlur={handleEmail} />
                {(error) && (
                  <FormHelperText>Email is not valid</FormHelperText>
                )}
                <Typography>Invitation message</Typography>
              </FormControl>
              <FormControl>
                <TextField
                  id="standard-multiline-static"
                  onBlur={handleMessageEmail}
                  multiline
                  rows={4}
                  defaultValue={messageEmail}
                  variant="outlined"
                />
              </FormControl>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  mt: 3,
                }}
              >
                <Button onClick={() => setOpenModal(!openModal)}>Close</Button>
                <Button
                  variant="contained"
                  type="submit"
                  disabled={error || email === ""}
                >
                  Invite Contact
                </Button>
              </Box>
            </Box>
          </ModalDialog>
        </Modal>
      )}

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2.5,
        }}
      >
        <Typography sx={{ fontSize: "xl", fontWeight: "700" }}>
          {headerText}
        </Typography>
        {headerText === "Users" ? (
          <IconButton onClick={handleOpenModal}>
            <PersonAddIcon sx={{color:'black'}} />
          </IconButton>
        ) : null}
      </Box>

      <Input
        onChange={(e) => handleSearch(e)}
        placeholder="Search..."
        variant="outlined"
      />
      {filteredUsers ? (
        <List
          orientation={isSmallScreen ? "horizontal" : "vertical"}
          sx={{
            width: isSmallScreen ? "100vw" : "auto",
            height: isSmallScreen ? "auto" : "87vh",
            overflow: "auto",
            bgcolor: "#F1F4F8",
            "&::-webkit-scrollbar": { maxWidth: "6px", maxHeight: "4px" },
            "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
              backgroundColor: headerText === "Chats" ? "#DDE7EE" : "#DDE7EE",
              minHeight: 3,
              minWidth: 3,
            },
            padding: 2,
          }}
        >
          {filteredUsers.map((contact) => {
            return (
              <ContactCard
                key={contact._id}
                contact={contact}
                lastMessage={
                  lastMessage && headerText === "Chats"
                    ? lastMessage[contact._id]?.message?.text
                    : null
                }
                selectedUser={
                  headerText === "Chats"
                    ? handleChangeUser
                    : (contact) => handleSelectContact(contact)
                }
                selected={
                  headerText === "Chats" ? currentChat : selectedContact
                }
              />
            );
          })}
        </List>
      ) : (
        <Typography>No users found</Typography>
      )}
    </>
  );
}

export default UserList;
