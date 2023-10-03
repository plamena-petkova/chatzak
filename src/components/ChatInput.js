import { Box, Button, Input } from "@mui/joy";
import SendIcon from "@mui/icons-material/Send";
import { useState } from "react";

function ChatInput({handleSendMsg}) {

const [msg, setMsg] = useState([]);


const handleMessage = (event) => {
    setMsg(event.target.value);
}

const sendChat = (event, currentChat) => {
  if(currentChat) {
    console.log('CurrentChat', currentChat);
  }
 
    event.preventDefault();
    handleSendMsg(msg);
}

  return (
    <Box sx={{mt:3}}>
      <Input
        onChange={handleMessage}
        placeholder="Type your message..."
        endDecorator={
          <Button onClick={sendChat} variant="soft" endDecorator={<SendIcon />}></Button>
        }
      />
    </Box>
  );
}

export default ChatInput;
