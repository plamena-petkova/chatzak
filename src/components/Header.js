import {
  Avatar,
  Box,
  Button,
  Card,
  CardCover,
  DialogTitle,
  Input,
  Modal,
  ModalDialog,
  Sheet,
  Tooltip,
  Typography,
} from "@mui/joy";
import logo from "../assets/chatzakLogo.png";
import LogoutIcon from "@mui/icons-material/Logout";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import { useDispatch, useSelector } from "react-redux";
import { setClearMessages } from "../store/chatReducer";
import { editUserById, getUserById, logout } from "../store/authReducer";
import { useNavigate } from "react-router-dom";
import { socket } from "../socket";
import { useCallback, useEffect, useState } from "react";
import NewAvatar from "./NewRandomAvatar";

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currentUser = useSelector((state) => state.auth.user);

  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState("");

  const [editUsername, setEditUsername] = useState(false);
  const [editEmail, setEditEmail] = useState(false);
  const [editNames, setEditNames] = useState(false);
  const [updatedField, setUpdatedField] = useState({
    username: "",
    email: "",
    names: "",
  });

  const triggerLogout = () => {
    dispatch(logout());
    dispatch(setClearMessages());
    socket.disconnect();
    navigate("/login");
  };

  const onModalClose = () => {
    setOpen(false);
  };

  const updateField = useCallback(() => {
    const data = {
      currentUser,
      updatedField,
    };
    dispatch(editUserById(data));
    setUpdatedField("");
    if (editUsername) {
      setEditUsername(false);
    }
    if (editEmail) {
      setEditEmail(false);
    }
    if (editNames) {
      setEditNames(false);
    }
  }, [
    currentUser,
    updatedField,
    dispatch,
    setUpdatedField,
    editUsername,
    setEditUsername,
    editEmail,
    setEditEmail,
    editNames,
    setEditNames,
  ]);

  useEffect(() => {
    if (!currentUser || !socket) {
      getUserById(userId);
    }
  }, [currentUser, updateField, userId]);

  useEffect(() => {
    setUserId(currentUser._id);
  }, [currentUser]);


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
            maxWidth: "70vw",
            minHeight: "20vh",
            borderRadius: "sm",
          }}
        >
          <CardCover>
            <img style={{ objectFit: "cover" }} src={logo} alt="logo" />
          </CardCover>
        </Card>
      </Sheet>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Tooltip title="Update your avatar" variant="soft">
          <Button variant="soft" onClick={() => setOpen(true)} sx={{ ml: 0.5 }}>
            {currentUser?.names}
          </Button>
        </Tooltip>
        <Modal open={open} onClose={() => setOpen(false)}>
          <ModalDialog sx={{ minWidth: "75%", minHeight: "75%" }}>
            <Avatar
              size="lg"
              key={currentUser._id}
              src={`${currentUser?.avatarImg}`}
              sx={{ mr: 1, alignSelf: "center" }}
            >
              {currentUser.avatarImg
                ? currentUser.avatar
                : currentUser.names[0]}
            </Avatar>

            <NewAvatar onModalClose={onModalClose} />

            <DialogTitle
              sx={{ justifyContent: "space-between", alignItems: "center" }}
            >
              Username:
              {editUsername ? (
                <Input
                  placeholder="new username"
                  type="text"
                  onChange={(value) =>
                    setUpdatedField({ username: value.target.value })
                  }
                  endDecorator={
                    <Button
                      onClick={(event) => updateField(event.target.value)}
                      variant="soft"
                    >
                      <CheckIcon font="sm" />
                    </Button>
                  }
                  startDecorator={
                    <Button
                      onClick={() => setEditUsername(false)}
                      variant="soft"
                    >
                      <ClearIcon font="sm" />
                    </Button>
                  }
                />
              ) : (
                <Typography>{currentUser.username}</Typography>
              )}
              <Button
                sx={{ zIndex: 100 }}
                size="sm"
                variant="plain"
                onClick={() => setEditUsername(true)}
              >
                {!editUsername && <EditIcon fontSize="sm" />}
              </Button>
            </DialogTitle>

            <DialogTitle
              sx={{ justifyContent: "space-between", alignItems: "center" }}
            >
              Names:
              {editNames ? (
                <Input
                  placeholder="Type your new username"
                  type="text"
                  sx={{ m: 1 }}
                  onChange={(value) =>
                    setUpdatedField({ names: value.target.value })
                  }
                  endDecorator={
                    <Button
                      onClick={(event) => updateField(event.target.value)}
                      variant="soft"
                    >
                      <CheckIcon font="sm" />
                    </Button>
                  }
                  startDecorator={
                    <Button onClick={() => setEditNames(false)} variant="soft">
                      <ClearIcon font="sm" />
                    </Button>
                  }
                />
              ) : (
                <Typography>{currentUser.names}</Typography>
              )}
              <Button
                sx={{ zIndex: 100 }}
                size="sm"
                variant="plain"
                onClick={() => setEditNames(true)}
              >
                {!editNames && <EditIcon fontSize="sm" />}
              </Button>
            </DialogTitle>

            <DialogTitle
              sx={{ justifyContent: "space-between", alignItems: "center" }}
            >
              Email:
              {editEmail ? (
                <Input
                  placeholder="Type your new username"
                  type="text"
                  sx={{ m: 1 }}
                  onChange={(value) =>
                    setUpdatedField({ email: value.target.value })
                  }
                  endDecorator={
                    <Button
                      onClick={(event) => updateField(event.target.value)}
                      variant="soft"
                    >
                      <CheckIcon font="sm" />
                    </Button>
                  }
                  startDecorator={
                    <Button onClick={() => setEditEmail(false)} variant="soft">
                      <ClearIcon font="sm" />
                    </Button>
                  }
                />
              ) : (
                <Typography>{currentUser.email}</Typography>
              )}
              <Button
                sx={{ zIndex: 100 }}
                size="sm"
                variant="plain"
                onClick={() => setEditEmail(true)}
              >
                {!editEmail && <EditIcon fontSize="sm" />}
              </Button>
            </DialogTitle>

            <DialogTitle
              sx={{ justifyContent: "space-between", alignItems: "center" }}
            >
              Delete account:
              <Typography>{currentUser.username}</Typography>
              <Button
                sx={{ zIndex: 100 }}
                size="sm"
                variant="plain"
                onClick={() => console.log("Delete")}
              >
                <DeleteIcon fontSize="sm" />
              </Button>
            </DialogTitle>
          </ModalDialog>
        </Modal>
        {currentUser?._id && (
          <Avatar key={currentUser?._id} src={`${currentUser?.avatarImg}`}>
            {currentUser._id && currentUser?.avatarImg
              ? currentUser?.avatar
              : currentUser.names[0]}
          </Avatar>
        )}
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
