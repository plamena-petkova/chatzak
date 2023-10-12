import { Box, Button, Card, CardCover, Input, Typography } from "@mui/joy";
import { useState } from "react";
import logo from "../assets/chatzakLogo.png";
import { useNavigate } from "react-router-dom";
import { register } from "../store/authReducer";
import { useDispatch } from "react-redux";
import { socket } from "../socket";
import ErrorAlert from "../components/ErrorAlert";

function RegisterView() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [registerValues, setRegisterValues] = useState({
    email: "",
    names: "",
    username: "",
    password: "",
  });

  const [open, setOpen] = useState(false);

  const handleChange = (event) => {
    setRegisterValues({
      ...registerValues,
      [event.target.name]: event.target.value,
    });
  };

  const submitRegisterHandler = async (event) => {
    event.preventDefault();

    dispatch(register(registerValues))
      .unwrap()
      .then(() => {
        socket.connect();
        navigate("/chat");
      })
      .catch((error) => {
        console.error("Error", error);
        setOpen(true);
        return;
      });
  };

  const onCloseHandler = () => {
    setOpen(false);
    setRegisterValues({});
  };

  return (
    <>
      {open ? <ErrorAlert onCloseHandler={onCloseHandler} /> : null}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Card sx={{ minWidth: 400 }}>
          <Card
            sx={{
              maxWidth: 400,
              minHeight: 200,
              borderRadius: "sm",
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
              <Typography sx={{ fontSize: 25 }}>Register</Typography>
            </Box>
            <Box component="form" onSubmit={submitRegisterHandler}>
            <Input
              placeholder="Email"
              name="email"
              type="email"
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
              sx={{ m: 1 }}
              onChange={handleChange}
            />
            <Input
              placeholder="Password"
              name="password"
              type="password"
              sx={{ m: 1 }}
              onChange={handleChange}
            />
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Button type="submit" >Register</Button>
            </Box>
            </Box>
          </Box>
        </Card>
      </Box>
    </>
  );
}

export default RegisterView;
