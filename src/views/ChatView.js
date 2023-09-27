import { Button, Grid, Input } from "@mui/joy";
import SideBar from "../components/SideBarContacts";
import Header from "../components/Header";
import SendIcon from '@mui/icons-material/Send';


function ChatView () {

return (
    <>
    <Header />
    <Grid direction={'column'} justifyContent={'space-between'} alignItems={'stretch'} >
    
    <SideBar />
    
    <Input placeholder="Type your message..." endDecorator={<Button variant='soft' endDecorator={<SendIcon />}></Button>} />

   </Grid>
   </>
)

}

export default ChatView;