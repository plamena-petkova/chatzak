import { Box } from "@mui/joy";
import SnackbarComponent from "../components/SnackbarComponent";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import SideBarComponent from "../components/SideBarComponent";

function ChatView() {
  const newMessageIndicator = useSelector(
    (state) => state.chat.newMessageIndicator
  );
  const newMessageObject = Object.values(newMessageIndicator);
  const [openNewSnack, setOpenNewSnack] = useState(false);

  useEffect(() => {
    if (newMessageObject.map((item) => item.show).includes(true)) {
      setOpenNewSnack(true);
    }
  }, [openNewSnack, newMessageObject]);

  const handleCloseSnack = () => {
    setOpenNewSnack(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",

        maxHeight: "90vh",
      }}
    >
      <SideBarComponent />

      <SnackbarComponent open={openNewSnack} handleClose={handleCloseSnack} />
    </Box>
  );
}

export default ChatView;
