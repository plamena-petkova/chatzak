import { Box, Button, Typography, Input, Divider, Avatar } from "@mui/joy";
import { FormControl, Modal, Paper } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { useState } from "react";
import PositionedMenu from "./PositionedMenu";
import { format, isToday } from "date-fns";
import { useSelector } from "react-redux";

function MessageComponent({
  msg,
  onDeleteHandler,
  onEditHandler,
  alignItems,
  dateDivider,
  currentDate,
}) {
  const currentChat = useSelector((state) => state.chat.currentChat);
  const currentUser = useSelector((state) => state.auth.user);

  const [editMessage, setEditMessage] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const formatDate = (date) => format(new Date(date), "HH:mm");

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

  const messageFromSelf = (
    <Box sx={{ display: "flex", flexDirection: "row" }}>
      {editMessage && editMessageInput}
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "end" }}>
        <Box
          sx={{ display: "flex", flexDirection: "row", alignItems: "start" }}
        >
          <PositionedMenu
            message={msg}
            onDelete={() => onDeleteHandler(msg.id)}
            onEdit={() => onEditMode()}
          />
          {msg.message.includes("https://firebasestorage") ? (
            <Button
              sx={{
                "&:hover": {
                  background: "transparent",
                },
              }}
              variant="plain"
              onClick={() => setIsOpen(true)}
            >
              <img
                height={"150px"}
                width={"auto"}
                maxwidth={"28vw"}
                alt="imageSend"
                src={msg.message}
              />
            </Button>
          ) : (
            <Paper
              variant="outlined"
              sx={{
                whiteSpace: "normal",
                maxWidth: 700,
                borderRadius: "10px",
                p: 0.5,
                pl: 1,
                pr: 1,
                cursor: "pointer",
                bgcolor: "white",
              }}
              disabled={msg.isRemoved}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "end",
                  alignItems: "end",
                }}
              >
                <Typography
                  sx={{
                    color: msg?.isRemoved ? "lightgrey" : "#32383E",
                    fontWeight: "lg",
                    fontSize: "md",
                    wordBreak: "break-word",
                  }}
                >
                  {msg.message}
                </Typography>

                <Typography
                  sx={{
                    fontSize: "11px",
                    alignContent: "center",
                    color: "grey",
                  }}
                  startDecorator={
                    <AccessTimeIcon color="grey" fontSize="11px" />
                  }
                >
                  {formatDate(msg.date)}{" "}
                </Typography>
              </Box>
            </Paper>
          )}
        </Box>
        <Typography sx={{ fontSize: "14px", pt: 1, pr: 1 }}>
          {currentUser.username}
        </Typography>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "row", alignItems: "end" }}>
        <Avatar
          size="sm"
          key={currentUser._id}
          src={`${currentUser.avatarImg}`}
        />
      </Box>
    </Box>
  );

  const messageFromUser = (
    <Box sx={{ display: "flex", flexDirection: "row" }}>
      {editMessage && editMessageInput}
      <Box sx={{ display: "flex", flexDirection: "row", alignItems: "end" }}>
        <Avatar
          size="sm"
          key={currentUser._id}
          src={`${currentChat.avatarImg}`}
        />
      </Box>
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "start" }}
      >
        <Box
          sx={{ display: "flex", flexDirection: "row", alignItems: "start" }}
        >
          {msg.message.includes("https://firebasestorage") ? (
            <Button
              sx={{
                "&:hover": {
                  background: "transparent",
                },
              }}
              variant="plain"
              onClick={() => setIsOpen(true)}
            >
              <img
                height={"150px"}
                width={"auto"}
                maxwidth={"28vw"}
                alt="imageSend"
                src={msg.message}
              />
            </Button>
          ) : (
            <Paper
              variant="outlined"
              sx={{
                whiteSpace: "normal",
                maxWidth: 700,
                borderRadius: "10px",
                p: 0.5,
                pl: 1,
                pr: 1,
                cursor: "pointer",
                bgcolor: "#465CA2",
              }}
              disabled={msg.isRemoved}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "end",
                  alignItems: "end",
                }}
              >
                <Typography
                  sx={{
                    color: msg?.isRemoved ? "lightgrey" : "#FBFCFE",
                    fontWeight: "lg",
                    fontSize: "md",
                    wordBreak: "break-word",
                  }}
                >
                  {msg.message}
                </Typography>

                <Typography
                  sx={{
                    fontSize: "11px",
                    alignContent: "center",
                    color: "lightgrey",
                  }}
                  startDecorator={<AccessTimeIcon fontSize="11px" />}
                >
                  {formatDate(msg.date)}{" "}
                </Typography>
              </Box>
            </Paper>
          )}
        </Box>
        <Typography sx={{ fontSize: "14px", pt: 1, pl: 1 }}>
          {currentChat.username}
        </Typography>
      </Box>
    </Box>
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
      {dateDivider && (
        <Divider sx={{ "--Divider-childPosition": "50%" }}>
          {isToday(currentDate) ? "Today" : currentDate}
        </Divider>
      )}

      {msg.fromSelf ? messageFromSelf : messageFromUser}

      <Modal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Paper
          sx={{
            p: 1,
            maxWidth: "80vw",
            maxHeight: "80vh",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Button variant="plain" onClick={() => setIsOpen(false)}>
              <CloseIcon />
            </Button>
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
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
