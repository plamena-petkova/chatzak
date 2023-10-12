import { Avatar, Box, Button, Card, CardCover, DialogTitle, Modal, ModalDialog, Sheet, Tooltip } from "@mui/joy";
import logo from "../assets/chatzakLogo.png";
import LogoutIcon from "@mui/icons-material/Logout";
import { useDispatch, useSelector } from "react-redux";
import { setClearMessages } from "../store/chatReducer";
import { logout } from "../store/authReducer";
import { useNavigate } from "react-router-dom";
import InputFileUpload from "./UploadFile";
import { socket } from "../socket";
import { useState } from "react";

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currentUser = useSelector((state) => state.auth.user);

  const [open, setOpen] = useState(false);

  const triggerLogout = () => {
    dispatch(logout());
    dispatch(setClearMessages());
    socket.disconnect();
    navigate("/login");
  };

  const onModalClose = () => {
    setOpen(false);
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        maxWidth: 270,
        mt: 2,
        mb: 2,
        borderRadius: "7px",
      }}
    >
      <Sheet
        variant="outlined"
        sx={{
          width: 270,
          overflow: "auto",
          borderRadius: "sm",
        }}
      >
        <Card
          sx={{
            maxWidth: 250,
            minHeight: 80,
            borderRadius: "sm",
          }}
        >
          <CardCover>
            <img style={{ objectFit: "cover" }} src={logo} alt="logo" />
          </CardCover>
        </Card>
      </Sheet>
      <Box sx={{display:'flex',flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
      <Tooltip title="Create your avatar" variant="soft">
      <Button variant="soft" onClick={() => setOpen(true)} sx={{ml:0.5}}>{currentUser?.names}</Button>
      </Tooltip>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog>
          <DialogTitle>Create or Update Avatar</DialogTitle>
          <InputFileUpload onModalClose={onModalClose} />
        </ModalDialog>
      </Modal>
      {currentUser?._id && 
        <Avatar key={currentUser?._id} src={`${currentUser?.avatarImg}`}>
          {currentUser._id && currentUser?.avatarImg
            ? currentUser?.avatar
            : currentUser.names[0]}
        </Avatar>
      }
      <Button
        onClick={triggerLogout}
        variant="soft"
        endDecorator={<LogoutIcon />}
      />
      </Box>
    </Box>
  );
}

export default Header;

