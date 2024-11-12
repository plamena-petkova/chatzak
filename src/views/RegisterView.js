import {
  Box,
  Card,
  CardCover,
  Input,
  Link,
  Typography,
} from "@mui/joy";
import { useEffect, useState } from "react";
import logo from "../assets/chatzakLogo.png";
import { useNavigate } from "react-router-dom";
import { fetchUsers, register, setEmailHomePage } from "../store/authReducer";
import { useDispatch, useSelector } from "react-redux";
import ErrorAlert from "../components/ErrorAlert";
import { LoadingButton } from "@mui/lab";
import { useSocket } from "../App";

function RegisterView() {
  const dispatch = useDispatch();

  const socket = useSocket();

  const navigate = useNavigate();

  const emailHomePage = useSelector((state) => state.auth.emailHomePage)

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

   
    try {
      const result = await  dispatch(register(registerValues));
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
      dispatch(setEmailHomePage(''));

    } catch (error) {
      console.error("Error", error.message);
      dispatch(setEmailHomePage(''));
      if (error.message === "Request failed with status code 404") {
        setErrorMsg("Incorrect username or password");
      } else {
        setErrorMsg(error.message);
      }
      setOpen(true);
      return;
    } 
  };

  const onCloseHandler = () => {
    setOpen(false);
    setRegisterValues({ email: "", names: "", username: "", password: "" });
    dispatch(setEmailHomePage(''));
  };

useEffect(() => {
  if(emailHomePage) {
    setRegisterValues({email:emailHomePage})
  }
}, [emailHomePage])

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
                defaultValue={emailHomePage}
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
