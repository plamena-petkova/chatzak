import * as React from "react";
import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import Tab, { tabClasses } from "@mui/joy/Tab";
import {
  AspectRatio,
  Avatar,
  Box,
  Button,
  ListItemDecorator,
} from "@mui/joy";
import logoSmall from "../assets/logoSmall.png";
import { useSelector } from "react-redux";
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import GroupIcon from '@mui/icons-material/Group';

export default function SideBarComponent({ children }) {
  const currentUser = useSelector((state) => state.auth.user);

  return (
    <Tabs
      orientation="vertical"
      aria-label="tabs"
      defaultValue={0}
      sx={{ bgcolor: "transparent", minHeight: "100vh" }}
    >
      <TabList
        disableUnderline
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          p: 1.5,
          gap: 1.5,
          pt:10,
          pb:10,
          bgcolor: "background.level1",
          [`& .${tabClasses.root}[aria-selected="true"]`]: {
            boxShadow: "sm",
            bgcolor: "background.surface",
          },
        }}
      >
        <Button variant="plain" disableIndicator>
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
   <Box >
          <Tab value={1} disableIndicator>
            <ListItemDecorator sx={{ justifyContent: "center", pb:6, pt:6}}>
              <QuestionAnswerIcon />
            </ListItemDecorator>
          </Tab>
          <Tab value={2} disableIndicator>
            {" "}
            <ListItemDecorator sx={{ justifyContent: "center", pb:6, pt:6 }}>
              <GroupIcon />
            </ListItemDecorator>
          </Tab>
          <Tab value={3} disableIndicator>
            {" "}
            <ListItemDecorator sx={{ justifyContent: "center", pb:6,pt:6}}>
              <ManageAccountsIcon />
            </ListItemDecorator>
          </Tab>
          </Box>
          <Button variant="plain" disableIndicator>
            {" "}
            <ListItemDecorator sx={{ justifyContent: "center" }}>
              <Avatar key={currentUser?._id} src={`${currentUser?.avatarImg}`}>
                {currentUser._id && currentUser?.avatarImg
                  ? currentUser?.avatar
                  : currentUser.names[0]}
              </Avatar>
            </ListItemDecorator>
          </Button>
      </TabList>
      {children}
    </Tabs>
  );
}
