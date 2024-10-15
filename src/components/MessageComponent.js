import { Box, Button, Typography, Input } from "@mui/joy";
import { FormControl, Modal, Paper } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from '@mui/icons-material/Close';
import { useState } from "react";
import PositionedMenu from "./PositionedMenu";

function MessageComponent({ msg, onDeleteHandler, onEditHandler, alignItems }) {
  const [editMessage, setEditMessage] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const onEditMode = () => {
    setEditMessage(true);
    setNewMessage(msg.message);
  };

  const editHandler = (messageId, event) => {
    setNewMessage(event.target.value);
  };

  const onSubmitHandler = (event, messageId) => {
    event.preventDefault();
    onEditHandler(messageId, newMessage);
    setEditMessage(false);
  };

  const editMessageInput = (
    <FormControl>
      <Input
        key={uuidv4()}
        sx={{ "--Input-focused": 1, width: 256 }}
        defaultValue={newMessage}
        onBlur={(event) => editHandler(msg.id, event)}
        endDecorator={
          <Button
            onClick={(event) => onSubmitHandler(event, msg.id)}
            variant="soft"
          >
            <CheckIcon font="sm" />
          </Button>
        }
        startDecorator={
          <Button onClick={() => setEditMessage(false)} variant="soft">
            <CloseIcon font="sm" />
          </Button>
        }
      />
    </FormControl>
  );

  return (
    <Box
      key={uuidv4()}
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyItems: "center",
        mt: 2,
        mb: 2,
        alignItems: { alignItems },
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "row" }}>
        {editMessage && editMessageInput}

        <Paper
          variant="outlined"
          sx={{
            whiteSpace: "normal",
            maxWidth: 700,
            borderRadius: "10px",
            p: 0.5,
            cursor: "pointer",
            bgcolor: alignItems.includes("start") ? "#465CA2" : "white",
          }}
          disabled={msg.isRemoved}
        >
          {msg.isRemoved ? (
            <Typography
              sx={{
                mr: 1,
                ml: 1,
                color: "lightgrey",
                fontWeight: "lg",
                fontSize: "md",
                wordBreak: "break-word",
              }}
            >
              {msg.message}
            </Typography>
          ) : (
            <Typography
              sx={{
                mr: 1,
                ml: 1,
                color: alignItems.includes("start") ? "#FBFCFE" : "#32383E",
                fontWeight: "lg",
                fontSize: "md",
                wordBreak: "break-word",
              }}
            >
              {msg.message.includes("https://firebasestorage") ? (
                <Button variant="plain" onClick={() => setIsOpen(true)}> 
                  <img
                    height={"150px"}
                    width={"auto"}
                    maxwidth={"28vw"}
                    alt="imageSend"
                    src={msg.message}
                  />
                </Button>
              ) : (
                msg.message
              )}
            </Typography>
          )}
        </Paper>

        {msg.fromSelf && !msg.isRemoved ? (
          <PositionedMenu
            message={msg}
            onDelete={() => onDeleteHandler(msg.id)}
            onEdit={() => onEditMode()}
          />
        ) : null}
      </Box>

      <Modal
  open={isOpen}
  onClose={() => setIsOpen(false)}
  sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
>
  <Paper
    sx={{
      p:1,
      maxWidth: "80vw",
      maxHeight: "80vh",
      display: "flex",
      flexDirection: "column", // Layout items vertically
    }}
  >
    {/* Header Section for Close Button */}
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-end", // Align button to the right
      }}
    >
      <Button
      variant="plain"
        onClick={() => setIsOpen(false)}
      >
        <CloseIcon />
      </Button>
    </Box>

    {/* Image Section */}
    <Box
      sx={{
        display: "flex",
        justifyContent: "center", // Center the image horizontally
        alignItems: "center",
        height: "100%",
      }}
    >
      <img
        src={msg.message}
        alt="Larger View"
        style={{ maxWidth: "100%", maxHeight: "80vh", height: "auto" }}
      />
    </Box>
  </Paper>
</Modal>

    </Box>
  );
}

export default MessageComponent;
