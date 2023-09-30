import { Box } from "@mui/joy";
import ContactCard from "./ContactCard";

function SideBar({ contacts, message }) {
  
  return (
    <Box>
      <ContactCard contacts={contacts} key={contacts._id} />
    </Box>
  );
}

export default SideBar;

/*
    <Tabs
      aria-label="Vertical tabs"
      orientation="vertical"
      sx={{ minWidth: 600, height: 200 }}
    >
      <ContactCard contacts={contacts} />

      <TabPanel value={0}>{chatMessage}</TabPanel>
      <TabPanel value={1}>
        <b>Second</b> tab panel
      </TabPanel>
      <TabPanel value={2}>
        <b>Third</b> tab panel
      </TabPanel>
    </Tabs>

  */
