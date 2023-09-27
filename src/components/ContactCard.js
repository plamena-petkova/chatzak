import { Avatar, Tab, TabList, TabPanel } from "@mui/joy";


function ContactCard () {


return (
<>
<TabList>
    <Tab sx={{minWidth:270}}><Avatar >PP</Avatar>Name</Tab>
    <Tab sx={{minWidth:270}}><Avatar >PP</Avatar>Name</Tab>
    <Tab sx={{minWidth:270}}><Avatar >PP</Avatar>Name</Tab>
</TabList>
  
  <TabPanel value={0}>
    <b>First</b> tab panel
  </TabPanel>
  <TabPanel value={1}>
    <b>Second</b> tab panel
  </TabPanel>
  <TabPanel value={2}>
    <b>Third</b> tab panel
  </TabPanel>
  

  </>
)

}

export default ContactCard;