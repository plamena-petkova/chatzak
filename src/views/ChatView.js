import {
  AspectRatio,
  Button,
  Grid,
  List,
  ListItemDecorator,
  tabClasses,
} from "@mui/joy";
import { useEffect, useState } from "react";
import UsersComponent from "../components/UsersComponent";
import logoSmall from "../assets/logoSmall.png";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import GroupIcon from "@mui/icons-material/Group";
import MenuButtonProfile from "../components/MenuButtonProfile";
import ChatComponent from "../components/ChatComponent";
import { useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import SnackbarComponent from "../components/SnackbarComponent";

function ChatView() {

  const [menuOpen, setMenuOpen] = useState({
    chat: true,
    contacts: false,
    setting: false,
  });

  const isSmallScreen = useMediaQuery("(max-width:899px)");

  const newMessageIndicator = useSelector(
    (state) => state.chat.newMessageIndicator
  );
  const newMessageObject = Object.values(newMessageIndicator);
  const [openNewSnack, setOpenNewSnack] = useState(false);

  useEffect(() => {
    if (newMessageObject.map((item) => item.show).includes(true)) {
      setOpenNewSnack(true);
    }
  }, [newMessageObject]);

  const handleCloseSnack = () => {
    setOpenNewSnack(false);
  };


  return (
    <Grid container sx={{ height: "100%", width:'100%' }}>
      <Grid xs={12} md={0.75} sx={{flexWrap:'wrap'}}>
      <SnackbarComponent messageFromUser={newMessageObject} open={openNewSnack} handleClose={handleCloseSnack} />
        <List
          sx={{
            minHeight: isSmallScreen ? null : "100vh",
            maxHeight: isSmallScreen ? "25vh" : null,
            display: "flex",
            flexDirection: isSmallScreen ? "row" : "column",
            justifyContent: "space-between",
            
            p: 1,
            gap: 1,
            pt: 7,
            pb: 7,
            bgcolor: "#FBFCFE",
            [`& .${tabClasses.root}[aria-selected="true"]`]: {
              boxShadow: "sm",
              bgcolor: "background.surface",
            },
          }}
        >
          <Button variant="plain">
            <ListItemDecorator sx={{ justifyContent: "center" }}>
              <AspectRatio ratio="1" sx={{ minWidth: 30, borderRadius: "50%" }}>
                <img
                  srcSet={`${logoSmall}?h=120&fit=crop&auto=format&dpr=2 2x`}
                  src={`${logoSmall}?h=120&fit=crop&auto=format`}
                  alt="logo"
                />
              </AspectRatio>
            </ListItemDecorator>
          </Button>

          <Button
            variant="plain"
            sx={{ color: "black" }}
            onClick={() =>
              setMenuOpen({ chat: true, contacts: false, setting: false })
            }
          >
            <ListItemDecorator sx={{ justifyContent: "center" }}>
              <QuestionAnswerIcon />
            </ListItemDecorator>
          </Button>
          <Button
            variant="plain"
            sx={{ color: "black" }}
            onClick={() =>
              setMenuOpen({ chat: false, contacts: true, setting: false })
            }
          >
            {" "}
            <ListItemDecorator sx={{ justifyContent: "center" }}>
              <GroupIcon />
            </ListItemDecorator>
          </Button>
          <Button
            variant="plain"
            sx={{ color: "black" }}
            onClick={() =>
              setMenuOpen({ chat: false, contacts: false, setting: true })
            }
          >
            {" "}
            <ListItemDecorator sx={{ justifyContent: "center" }}>
              <ManageAccountsIcon />
            </ListItemDecorator>
          </Button>
          <MenuButtonProfile />
        </List>
      </Grid>
      <Grid xs={12} md={11.25}>
        {menuOpen.chat === true && <ChatComponent />}
        {menuOpen.contacts === true && <UsersComponent />}
      </Grid>
    </Grid>
  );
}

export default ChatView;

/*
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

  <SnackbarComponent open={openNewSnack} handleClose={handleCloseSnack} />

   const handleCloseSnack = () => {
    setOpenNewSnack(false);
  };

*/
