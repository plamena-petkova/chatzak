import {
  Box,
  Card,
  CardCover,
  Input,
  Link,
  Typography,
} from "@mui/joy";
import { useState } from "react";
import logo from "../assets/chatzakLogo.png";
import { useNavigate } from "react-router-dom";
import { register } from "../store/authReducer";
import { useDispatch } from "react-redux";
import { socket } from "../socket";
import ErrorAlert from "../components/ErrorAlert";
import { LoadingButton } from "@mui/lab";

function RegisterView() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [registerValues, setRegisterValues] = useState({
    email: "",
    names: "",
    username: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const disableButton =
    registerValues.email === "" &&
    registerValues.password === "" &&
    registerValues.names === "" &&
    registerValues.username === "";

  const handleChange = (event) => {
    setRegisterValues({
      ...registerValues,
      [event.target.name]: event.target.value,
    });
  };

  const submitRegisterHandler = async (event) => {
    event.preventDefault();

    setLoading(true);

    dispatch(register(registerValues))
      .unwrap()
      .then(() => {
        socket.connect();
        navigate("/chat");
      })
      .catch((error) => {
        if (error.message === "Request failed with status code 409") {
          setErrorMsg("Username or email is already used!");
        } else {
          setErrorMsg(error.message);
        }

        setOpen(true);
        return;
      });
  };

  const onCloseHandler = () => {
    setOpen(false);
    setRegisterValues({ email: "", names: "", username: "", password: "" });
  };

  return (
    <>
      {open ? (
        <ErrorAlert message={errorMsg} onCloseHandler={onCloseHandler} />
      ) : null}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
        }}
      >
        <Card sx={{ minWidth: 400, minHeight: 200  }}>
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
              <Typography sx={{ fontSize: 25 }}>Register</Typography>
            </Box>
            <Box component="form" onSubmit={submitRegisterHandler}>
              <Input
                placeholder="Email"
                name="email"
                type="email"
                required
                sx={{ m: 1 }}
                onChange={handleChange}
              />
              <Input
                placeholder="Names"
                name="names"
                type="text"
                sx={{ m: 1 }}
                onChange={handleChange}
              />
              <Input
                placeholder="Username"
                name="username"
                type="text"
                required
                sx={{ m: 1 }}
                onChange={handleChange}
              />
              <Input
                placeholder="Password"
                name="password"
                type="password"
                required
                sx={{ m: 1 }}
                onChange={handleChange}
              />
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <LoadingButton variant="contained" type="submit" disabled={disableButton}
                  loading={loading}
                  >
                  Register
                </LoadingButton>
              </Box>
            </Box>
          </Box>
          <Link
            sx={{ justifyContent: "center", ml: 4, mr: 4, fontSize: "sm" }}
            variant="soft"
            href="/login"
          >
            Return to login
          </Link>
        </Card>
      </Box>
    </>
  );
}

export default RegisterView;
