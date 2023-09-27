import { Tabs } from "@mui/joy";
import ContactCard from "./ContactCard";

function    SideBar () {



return (


    <Tabs
    aria-label="Vertical tabs"
    orientation="vertical"
    sx={{ minWidth: 600, height: 200 }}
  >
   <ContactCard />
  </Tabs>  

    );
}

export default SideBar;