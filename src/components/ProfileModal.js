import {
  Button,
  DialogTitle,
  Input,
  Modal,
  ModalDialog,
  Typography,
} from "@mui/joy";
import NewAvatar from "./NewRandomAvatar";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import { useEffect, useState } from "react";
import { editUserById } from "../store/authReducer";
import { useDispatch, useSelector } from "react-redux";

function ProfileModal({ open, onCloseHandler }) {
  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.auth.user);

  const [openModal, setOpenModal] = useState(false);
  const [editUsername, setEditUsername] = useState(false);
  const [editEmail, setEditEmail] = useState(false);
  const [editNames, setEditNames] = useState(false);
  const [updatedField, setUpdatedField] = useState({
    username: "",
    email: "",
    names: "",
  });


  useEffect(() => {
    if(open) {
      setOpenModal(true);
    } 
    if(!openModal) {
      onCloseHandler(false)
    }
     
    
  }, [open, setOpenModal, onCloseHandler, openModal])


  const updateField = (e) => {
    e.preventDefault();

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
  };

  return (
    <Modal open={openModal} onClose={() => setOpenModal(!openModal)}>
      <ModalDialog sx={{ minWidth: "50%", minHeight: "55%" }}>
        <NewAvatar />

        <DialogTitle
          sx={{ justifyContent: "space-between", alignItems: "center" }}
        >
          Username:
          {editUsername ? (
            <Input
              placeholder="Type new username"
              type="text"
              onChange={(value) =>
                setUpdatedField({ username: value.target.value })
              }
              endDecorator={
                <Button onClick={updateField} variant="soft">
                  <CheckIcon font="sm" />
                </Button>
              }
              startDecorator={
                <Button onClick={() => setEditUsername(false)} variant="soft">
                  <ClearIcon font="sm" />
                </Button>
              }
            />
          ) : (
            <Typography>{currentUser.username}</Typography>
          )}
          {!editUsername && (
            <Button
              sx={{ zIndex: 100 }}
              size="sm"
              variant="plain"
              onClick={() => setEditUsername(true)}
            >
              <EditIcon fontSize="sm" />{" "}
            </Button>
          )}
        </DialogTitle>

        <DialogTitle
          sx={{ justifyContent: "space-between", alignItems: "center" }}
        >
          Names:
          {editNames ? (
            <Input
              placeholder="Type your names"
              type="text"
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
           {!editNames && <Button
            sx={{ zIndex: 100 }}
            size="sm"
            variant="plain"
            onClick={() => setEditNames(true)}
          >
            <EditIcon fontSize="sm" /> </Button>}
         
        </DialogTitle>

        <DialogTitle
          sx={{ justifyContent: "space-between", alignItems: "center" }}
        >
          Email:
          {editEmail ? (
            <Input
              placeholder="Type your new email"
              type="text"
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
          {!editEmail &&<Button
            sx={{ zIndex: 100 }}
            size="sm"
            variant="plain"
            onClick={() => setEditEmail(true)}
          >
             <EditIcon fontSize="sm" /></Button>}
          
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
  );
}

export default ProfileModal;
