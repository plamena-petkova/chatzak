import * as React from "react";
import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import Tab, { tabClasses } from "@mui/joy/Tab";
import {
  AspectRatio,
  Button,
  Grid,
  ListItemDecorator,
  TabPanel,
} from "@mui/joy";
import logoSmall from "../assets/logoSmall.png";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import GroupIcon from "@mui/icons-material/Group";
import ChatComponent from "./ChatComponent";
import UsersComponent from "./UsersComponent";
import MenuButtonProfile from "./MenuButtonProfile";

function SideBarComponent() {
  return (
    <Tabs
      orientation="vertical"
      aria-label="tabs"
      defaultValue={1}
      sx={{ bgcolor: "transparent", minHeight: "100vh" }}
    >
      <Grid xs={2} md={1} sx={{ minHeight: "100vh" }}>
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
          <MenuButtonProfile />
        </TabList>
      </Grid>
      <Grid xs={12} md={12}>
        <TabPanel value={1}>
          <ChatComponent />
        </TabPanel>
        <TabPanel value={2}>
          <UsersComponent />
        </TabPanel>
        <TabPanel value={3}>Favorites</TabPanel>
      </Grid>
    </Tabs>
  );
}

export default SideBarComponent;
