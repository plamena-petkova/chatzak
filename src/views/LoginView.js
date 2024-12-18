import { Box, Card, CardCover, Input, Typography, Link } from "@mui/joy";
import { useEffect, useState } from "react";
import logo from "../assets/chatzakLogo.png";

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchUsers, login } from "../store/authReducer";
import ErrorAlert from "../components/ErrorAlert";
import { LoadingButton } from "@mui/lab";
import { useSocket } from "../App";

function LoginView() {
  const dispatch = useDispatch();

  const socket = useSocket();

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [credentials, setCredentials] = useState(false);
  const [open, setOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [loading, setLoading] = useState(false);

  const onCloseHandler = () => {
    setOpen(false);
    setUsername("");
    setPassword("");
  };

  const usernameHandler = (event) => {
    setUsername(event.target.value);
  };

  const passwordHandler = (event) => {
    setPassword(event.target.value);
  };

  useEffect(() => {
    if (username !== "" && password !== "") {
      setCredentials(true);
    }
    if(errorMsg) {
      setLoading(false);
    }
  }, [username, password, errorMsg, setLoading]);

  const submitLoginHandler = async (event) => {
    event.preventDefault();
    setLoading(true);

    const data = { username, password };

    if (credentials) {
      try {
        const result = await dispatch(login(data));
        if (result.error) {
          if (result.error.message === "Request failed with status code 404") {
            setErrorMsg("Incorrect username or password");
          } else {
            setErrorMsg(result.error.message);
          }
          setOpen(true);
          return;
        }

        await dispatch(fetchUsers());
        socket.connect();
        if(result.payload._id) {
          socket.emit("add-user", result.payload._id);
        }
        navigate("/chat");

      } catch (error) {
        console.error("Error", error.message);
        if (error.message === "Request failed with status code 404") {
          setErrorMsg("Incorrect username or password");
        } else {
          setErrorMsg(error.message);
        }
        setOpen(true);
        return;
      }
    };
  };

  return (
    <>
      {open && (
        <ErrorAlert message={errorMsg} onCloseHandler={onCloseHandler} />
      )}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
        }}
      >
        <Card sx={{ minWidth: 400, minHeight: 200 }}>
          <Card
            sx={{
              maxWidth: 400,
              minHeight: 200,
              borderRadius: "sm",
            }}
          >
            <CardCover>
              <img src={logo} alt="logo" />
            </CardCover>
          </Card>
          <Box sx={{ maxWidth: 400, justifyContent: "center" }}>
            <Box
              sx={{ maxWidth: 400, display: "flex", justifyContent: "center" }}
            >
              <Typography sx={{ fontSize: 25 }}>Login</Typography>
            </Box>
            <Box component="form" onSubmit={submitLoginHandler}>
              <Input
                placeholder="Type your username"
                type="text"
                sx={{ m: 1 }}
                onChange={usernameHandler}
                value={username}
              />
              <Input
                placeholder="Type your password"
                type="password"
                sx={{ m: 1 }}
                onChange={passwordHandler}
                value={password}
              />
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <LoadingButton
                  variant="contained"
                  type="submit"
                  disabled={!credentials}
                  loading={loading}
                >
                  Login
                </LoadingButton>
              </Box>
            </Box>
          </Box>
          <Link
            sx={{ justifyContent: "center", ml: 4, mr: 4, fontSize: "sm" }}
            variant="soft"
            href="/register"
          >
            If you don't have an account, register here!
          </Link>
        </Card>
      </Box>
    </>
  );
}

export default LoginView;
