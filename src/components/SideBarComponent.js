import * as React from "react";
import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import Tab, { tabClasses } from "@mui/joy/Tab";
import {
  AspectRatio,
  Avatar,
  Button,
  Dropdown,
  Grid,
  ListItemDecorator,
  Menu,
  MenuButton,
  MenuItem,
  TabPanel,
} from "@mui/joy";
import logoSmall from "../assets/logoSmall.png";
import { useDispatch, useSelector } from "react-redux";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import GroupIcon from "@mui/icons-material/Group";
import ChatComponent from "./ChatComponent";
import ProfileModal from "./ProfileModal";
import { setClearMessages } from "../store/chatReducer";
import { logout } from "../store/authReducer";
import { useNavigate } from "react-router-dom";
import { socket } from "../socket";

export default function SideBarComponent() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currentUser = useSelector((state) => state.auth.user);

  const [openProfile, setOpenProfile] = React.useState(false);

  const triggerLogout = () => {
    dispatch(logout());
    dispatch(setClearMessages());
    socket.disconnect();
    navigate("/login");
  };

  return (
    <Tabs
      orientation="vertical"
      aria-label="tabs"
      defaultValue={1}
      sx={{ bgcolor: "transparent", minHeight: "100vh" }}
    >
      <Grid item xs={2} md={1} sx={{ minHeight: "100vh" }}>
        <TabList
          disableUnderline
          sx={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            p: 1,
            gap: 1,
            pt: 7,
            pb: 7,
            bgcolor: "background.level1",
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

          <Tab value={1} disableIndicator>
            <ListItemDecorator sx={{ justifyContent: "center", pb: 5, pt: 5 }}>
              <QuestionAnswerIcon />
            </ListItemDecorator>
          </Tab>
          <Tab value={2} disableIndicator>
            {" "}
            <ListItemDecorator sx={{ justifyContent: "center", pb: 5, pt: 5 }}>
              <GroupIcon />
            </ListItemDecorator>
          </Tab>
          <Tab value={3} disableIndicator>
            {" "}
            <ListItemDecorator sx={{ justifyContent: "center", pb: 5, pt: 5 }}>
              <ManageAccountsIcon />
            </ListItemDecorator>
          </Tab>
          <Dropdown>
          <ProfileModal open={openProfile} onCloseHandler={() => setOpenProfile(false)}/>
            <MenuButton>
              <ListItemDecorator sx={{ justifyContent: "center" }}>
                <Avatar
                  key={currentUser?._id}
                  src={`${currentUser?.avatarImg}`}
                >
                  {currentUser._id && currentUser?.avatarImg
                    ? currentUser?.avatar
                    : currentUser.names[0]}
                </Avatar>
              </ListItemDecorator>
            </MenuButton>
            <Menu>
              <MenuItem onClick={() => setOpenProfile(true)}>Profile</MenuItem>
              <MenuItem onClick={triggerLogout}>Logout</MenuItem>
            </Menu>
          </Dropdown>
        </TabList>
      </Grid>
      <Grid item xs={12} md={12}>
        <TabPanel value={1}>
          <ChatComponent />
        </TabPanel>
        <TabPanel value={2}>Users</TabPanel>
        <TabPanel value={3}>Favorites</TabPanel>
      </Grid>
    </Tabs>
  );
}
