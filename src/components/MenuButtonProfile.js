import { Avatar, Dropdown, ListItemDecorator, Menu, MenuButton, MenuItem } from "@mui/joy";
import ProfileModal from "./ProfileModal";
import { } from "@mui/base";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setClearMessages } from "../store/chatReducer";
import { logout } from "../store/authReducer";
import { socket } from "../socket";


function MenuButtonProfile() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const currentUser = useSelector((state) => state.auth.user);

    const [openProfile, setOpenProfile] = useState(false);
  
    const triggerLogout = () => {
      dispatch(logout());
      dispatch(setClearMessages());
      socket.disconnect();
      navigate("/login");
    };


    return(
        <Dropdown>
        <ProfileModal open={openProfile} onCloseHandler={() => setOpenProfile(false)}/>
          <MenuButton variant="soft">
            <ListItemDecorator sx={{ justifyContent: "center" }}>
              <Avatar
                key={currentUser?._id}
                src={`${currentUser?.avatarImg}`}
              >
                {currentUser._id && currentUser?.avatarImg
                  ? currentUser?.avatar
                  : currentUser.names[0]}
              </Avatar>
            </ListItemDecorator>
          </MenuButton>
          <Menu>
            <MenuItem onClick={() => setOpenProfile(true)}>Profile Settings</MenuItem>
            <MenuItem onClick={triggerLogout}>Logout</MenuItem>
          </Menu>
        </Dropdown>    
    )
}

export default MenuButtonProfile;