import { Avatar, Box, Button, Input } from "@mui/joy";
import SendIcon from "@mui/icons-material/Send";
import { useState } from "react";
import { useSelector } from "react-redux";

function ChatInput({ handleSendMsg }) {
  const [msg, setMsg] = useState("");

  const currentUser = useSelector((state) => state.auth.user);

  const handleMessage = (event) => {
    setMsg(event.target.value);
  };

  const sendChat = (event) => {
    event.preventDefault();
    handleSendMsg(msg);
    setMsg("");
  };

  return (
    <Box sx={{ mt: 3, display: "grid", gridTemplateColumns: "5% auto" }}>
      {currentUser._id && 
        <Avatar key={currentUser?._id} src={`${currentUser?.avatarImg}`}>
          {currentUser._id && currentUser?.avatarImg
            ? currentUser?.avatar
            : currentUser.names[0]}
        </Avatar>
      }
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
