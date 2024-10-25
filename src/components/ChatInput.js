import {
  Box,
  Button,
  CircularProgress,
  DialogTitle,
  Input,
  Modal,
  ModalDialog,
  styled,
  Tooltip,
  Typography,
} from "@mui/joy";
import SendIcon from "@mui/icons-material/Send";
import { useEffect, useState } from "react";
import Picker from "emoji-picker-react";
import InsertEmoticonSharpIcon from "@mui/icons-material/InsertEmoticonSharp";
import "../App.css";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ErrorAlert from "./ErrorAlert";
import uploadFile from "../firebase/uploadFile";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
  minWidth: 265,
});

function ChatInput({ handleSendMsg, isBlocked }) {
  const [msg, setMsg] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [error, setError] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [imageProgress, setImageProgress] = useState(0);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (e.target.files[0].size > 5000000) {
      setError(true);
      return;
    }


    if (file) {
      try {
        const downloadURL = await uploadFile(file, (progressValue) => {
          setImageProgress(progressValue); 
        });

        setImageProgress(0);
        setIsOpen(false);
        if (downloadURL) {
        sendChat(downloadURL);
      }
      } catch (err) {
        setError(err);
      }
    }
  };


  useEffect(() => {
    if (error) {
      setIsOpen(false);
    }
  }, [error]);

  const handleEmojiPickerHideShow = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleEmojiClick = (event, emojiObject) => {
    let message = msg;
    message += event.emoji;
    setMsg(message);
  };

  const handleMessage = (event) => {
    setMsg(event.target.value);
  };

  const sendChat = (msg) => {
    handleSendMsg(msg);
    setMsg("");
  };

  useEffect(() => {
    const keyDownHandler = (event) => {
      if (event.key === "Enter") {
        event.preventDefault();

        if (msg) {
          handleSendMsg(msg);
          setMsg("");
        }
      }
    };

    document.addEventListener("keydown", keyDownHandler);

    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, [handleSendMsg, msg]);

  const onCloseHandler = () => {
    setError(false);
  };

  return (
    <Box sx={{ position: "relative" }}>
      {showEmojiPicker && (
        <Box sx={{ position: "absolute", bottom: "100%" }}>
          <Picker onEmojiClick={handleEmojiClick} />
        </Box>
      )}
      {error && (
        <ErrorAlert
          message="The file is too big"
          onCloseHandler={onCloseHandler}
        />
      )}
      <Input
        onChange={handleMessage}
        value={msg}
        placeholder="Type your message..."
        startDecorator={
          <>
            <Tooltip title="Pick emoji" variant="soft">
              <Button onClick={handleEmojiPickerHideShow} variant="soft">
                <InsertEmoticonSharpIcon />
              </Button>
            </Tooltip>
            <Tooltip title="Add picture" variant="soft">
              <Button
                sx={{ ml: "2px" }}
                variant="soft"
                onClick={() => setIsOpen(true)}
              >
                <AddCircleIcon />

                <Modal open={isOpen} onClose={() => setIsOpen(false)}>
                  <ModalDialog>
                  <DialogTitle sx={{ justifyContent: "center" }}>
                          Upload File
                        </DialogTitle>
                    {imageProgress ? (
                      <Box sx={{ display: "flex", justifyContent: "center" }}>

                        <CircularProgress progress={imageProgress} />
                      </Box>
                    ) : (
                      <>
                        
                        <Typography>Max Size: 5MB</Typography>
                        <Button
                          sx={{ ml: "2px" }}
                          variant="soft"
                          component="label"
                        >
                          <AddCircleIcon />
                          <VisuallyHiddenInput
                            onChange={handleFileChange}
                            type="file"
                          />
                        </Button>
                      </>
                    )}
                  </ModalDialog>
                </Modal>
              </Button>
            </Tooltip>
          </>
        }
        endDecorator={
          <Button
            onClick={() => sendChat(msg)}
            variant="soft"
            endDecorator={<SendIcon />}
            disabled={msg.length < 1 || isBlocked}
          ></Button>
        }
      />
    </Box>
  );
}

export default ChatInput;
