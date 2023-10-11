import { Box, Button, Input } from "@mui/joy";
import SendIcon from "@mui/icons-material/Send";
import { useState } from "react";

function ChatInput({ handleSendMsg }) {
  const [msg, setMsg] = useState("");

  const handleMessage = (event) => {
    setMsg(event.target.value);
  };

  const sendChat = (event) => {
    event.preventDefault();
    handleSendMsg(msg);
    setMsg("");
  };

  return (
    <Box>
      <Input
        onChange={handleMessage}
        value={msg}
        placeholder="Type your message..."
        endDecorator={
          <Button
            onClick={sendChat}
            variant="soft"
            endDecorator={<SendIcon />}
          ></Button>
        }
      />
    </Box>
  );
}

export default ChatInput;
