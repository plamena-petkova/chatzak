import { Box, Button, Card, CardCover, Input, Typography } from "@mui/joy";
import { useState } from "react";
import { registerRoute } from "../utils/apiRoutes";
import logo from "../assets/chatzakLogo.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { setUser } from "../store/authReducer";
import { useDispatch } from "react-redux";

function RegisterView() {

  const dispatch = useDispatch()

  const navigate = useNavigate();

  const [registerValues, setRegisterValues] = useState({
    email: "",
    names: "",
    username: "",
    password: "",
  });

  const handleChange = (event) => {
    setRegisterValues({
      ...registerValues,
      [event.target.name]: event.target.value,
    });
  };

  const submitRegisterHandler = async (event) => {
    event.preventDefault();

    const { username, names, password, email } = registerValues;

    const { data } = await axios.post(registerRoute, {
      username,
      names,
      email,
      password,
    });

    

    if (data.status === false) {
      console.error("User is not created");
    }
    if (data.status === true) {
      dispatch(setUser(data.user))
      navigate('/chat');
    }
  };

  return (
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
            <Button onClick={submitRegisterHandler}>Register</Button>
          </Box>
        </Box>
      </Card>
    </Box>
  );
}

export default RegisterView;
