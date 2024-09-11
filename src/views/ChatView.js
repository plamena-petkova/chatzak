import { Box, TabPanel } from "@mui/joy";
import ChatComponent from "../components/ChatComponent";
import Header from "../components/Header";
import SnackbarComponent from "../components/SnackbarComponent";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import SideBarComponent from "../components/SideBarComponent";
import { ChatSharp } from "@mui/icons-material";
import ChatsComponent from "../components/ChatsComponent";

function ChatView() {
  const newMessageIndicator = useSelector(
    (state) => state.chat.newMessageIndicator
  );
  const newMessageObject = Object.values(newMessageIndicator);
  const [openNewSnack, setOpenNewSnack] = useState(false);

  useEffect(() => {
    if (newMessageObject.map((item) => item.show).includes(true)) {
      setOpenNewSnack(true);
    }
  }, [openNewSnack, newMessageObject]);

  const handleCloseSnack = () => {
    setOpenNewSnack(false);
  };

  const tabPanel = (
    <>
      <TabPanel sx={{height:'90vh'}} value={1}>
       <ChatsComponent />
      </TabPanel>
      <TabPanel value={2}>Users</TabPanel>
      <TabPanel value={3}>Favorites</TabPanel>
    </>
  );

  return (
    <Box sx={{ display: "flex", flexDirection: "row" }}>
      <SideBarComponent children={tabPanel} />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          mr: 4,
          ml: 4,
          maxHeight: "90vh",
        }}
      >
        <SnackbarComponent open={openNewSnack} handleClose={handleCloseSnack} />
      </Box>
    </Box>
  );

  /*
  =========================
      <>
    <Header />
    <SnackbarComponent open={openNewSnack} handleClose={handleCloseSnack} />
    <Tabs aria-label="Icon tabs" defaultValue={0}>
    <TabList>
      <Tab value={"chat"}>
        <ListItemDecorator>
          <ChatBubbleIcon />
        </ListItemDecorator>
        Chats
      </Tab>
      <Tab value={"users"}>
        <ListItemDecorator>
          <ContactsIcon />
        </ListItemDecorator>
        Contacts
      </Tab>
      <Tab value={"person"}>
        <ListItemDecorator>
          <PersonPinIcon />
        </ListItemDecorator>
        My Profile
      </Tab>
    </TabList>
    <TabPanel value="chat">
      
       <ChatComponent />
       
      </TabPanel>
      <TabPanel value="users">
        Users all
      </TabPanel>
      <TabPanel value="person">
        My profile should be placed here!
      </TabPanel>
  </Tabs>
  </>
  =======================================

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        mr: 4,
        ml: 4,
        maxHeight: "90vh",
      }}
    >
      <Header />

      <SnackbarComponent open={openNewSnack} handleClose={handleCloseSnack} />

      <ChatComponent />
    </Box>
  );
  */
}

export default ChatView;
