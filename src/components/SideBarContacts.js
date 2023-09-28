import {TabPanel, Tabs } from "@mui/joy";
import ContactCard from "./ContactCard";


function SideBar ({chatMessage, chatContacs}) {


return (


  <Tabs
    aria-label="Vertical tabs"
    orientation="vertical"
    sx={{ minWidth: 600, height: 200 }}
  >
   <ContactCard />
   
  
   
  
  <TabPanel value={0}>
  {chatMessage}
  </TabPanel>
  <TabPanel value={1}>
    <b>Second</b> tab panel
  </TabPanel>
  <TabPanel value={2}>
    <b>Third</b> tab panel
  </TabPanel>

  </Tabs>  

    );
}

export default SideBar;