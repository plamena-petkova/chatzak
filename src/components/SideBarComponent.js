import * as React from "react";
import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import Tab, { tabClasses } from "@mui/joy/Tab";
import { Box, ListItemDecorator, TabPanel } from "@mui/joy";
import PhoneIcon from "@mui/icons-material/Phone";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import { ChatBubble } from "@mui/icons-material";

export default function SideBarComponent({ children }) {
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
          p: 0.5,
          gap: 0.5,
          bgcolor: "background.level1",
          [`& .${tabClasses.root}[aria-selected="true"]`]: {
            boxShadow: "sm",
            bgcolor: "background.surface",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <Tab value={''} disableIndicator>
              <ListItemDecorator sx={{ justifyContent: "center" }}>
                <ChatBubble />
              </ListItemDecorator>
            </Tab>
          </Box>
          <Box>
            <Tab value={1} disableIndicator>
              <ListItemDecorator sx={{ justifyContent: "center" }}>
                <PhoneIcon />
              </ListItemDecorator>
            </Tab>
            <Tab value={2} disableIndicator>
              {" "}
              <ListItemDecorator sx={{ justifyContent: "center" }}>
                <FavoriteIcon />
              </ListItemDecorator>
            </Tab>
            <Tab value={3} disableIndicator>
              {" "}
              <ListItemDecorator sx={{ justifyContent: "center" }}>
                <PersonPinIcon />
              </ListItemDecorator>
            </Tab>
          </Box>
          <Box sx={{ mt: 10 }}>
            <Tab value={4} disableIndicator>
              {" "}
              <ListItemDecorator sx={{ justifyContent: "center" }}>
                <PersonPinIcon />
              </ListItemDecorator>
            </Tab>
            <Tab value={5} disableIndicator>
              {" "}
              <ListItemDecorator sx={{ justifyContent: "center" }}>
                <PersonPinIcon />
              </ListItemDecorator>
            </Tab>
          </Box>
        </Box>
      </TabList>
      {children}
    </Tabs>
  );
}
