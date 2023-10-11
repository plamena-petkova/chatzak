import { Box, Button, Card, CardCover, Input, Typography } from "@mui/joy";
import { useState } from "react";
import logo from "../assets/chatzakLogo.png";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/authReducer";
import { socket } from "../socket";

function WelcomeLoginView() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const isLoading = useSelector((state) => state.auth.isLoading);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const usernameHandler = (event) => {
    setUsername(event.target.value);
  };

  const passwordHandler = (event) => {
    setPassword(event.target.value);
  };

  const submitLoginHandler = async (event) => {
    event.preventDefault();

    const data = { username, password };

    dispatch(login(data));
    socket.connect();
    navigate("/chat");

    if (isLoading) {
      return <Box>is Loading...</Box>;
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        mt: 10,
      }}
    >
      <Card sx={{ minWidth: 400, minHeight: 200 }}>
        <Card
          sx={{
            maxWidth: 400,
            minHeight: 200,
            borderRadius: "s m",
          }}
        >
          <CardCover>
            <img src={logo} alt="" />
          </CardCover>
        </Card>
        <Box sx={{ maxWidth: 400, justifyContent: "center" }}>
          <Box
            sx={{ maxWidth: 400, display: "flex", justifyContent: "center" }}
          >
            <Typography sx={{ fontSize: 25 }}>Login</Typography>
          </Box>
          <Input
            placeholder="Type your username"
            type="text"
            sx={{ m: 1 }}
            onChange={usernameHandler}
          />
          <Input
            placeholder="Type your password"
            type="password"
            sx={{ m: 1 }}
            onChange={passwordHandler}
          />
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Button onClick={submitLoginHandler}>Login </Button>
          </Box>
        </Box>
      </Card>
    </Box>
  );
}

export default WelcomeLoginView;
