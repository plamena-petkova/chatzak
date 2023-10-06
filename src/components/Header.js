import { Box, Button, Card, CardCover, Sheet } from "@mui/joy";
import logo from "../assets/chatzakLogo.png";
import LogoutIcon from "@mui/icons-material/Logout";
import { useDispatch } from "react-redux";
import { setClearMessages } from "../store/chatReducer";
import { logout } from "../store/authReducer";
import { useNavigate } from "react-router-dom";

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const triggerLogout = () => {
    dispatch(logout());
    dispatch(setClearMessages());
    navigate("/login");
  };
  
  
  return (
    <Box sx={{mt:2, mb:2, borderRadius:'7px'}}>
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
            <img style={{objectFit:'cover'}}  src={logo} alt="logo" />
          </CardCover>
        </Card>
      </Sheet>
      <Button
       sx={{
        width: 270,
        overflow: "auto",
        borderRadius: "sm",
       
      }}
        onClick={triggerLogout}
        variant="soft"
        endDecorator={<LogoutIcon />}
      ></Button>
     <Button
  variant="contained"
  component="label"
>
  Upload File
  <input
    type="file"
    hidden
  />
</Button>
    </Box>
  );
}

export default Header;