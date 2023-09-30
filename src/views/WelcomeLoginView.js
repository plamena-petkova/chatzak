import { Box, Button, Card, CardCover, Input, Typography } from "@mui/joy";
import { useState } from "react";
import logo from "../assets/chatzakLogo.png";
import axios from "axios";
import { loginRoute } from "../utils/apiRoutes";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../store/authReducer";

function WelcomeLoginView () {

  const dispatch = useDispatch()

  const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const usernameHandler = (event) => {
        setUsername(event.target.value);
    }

    const passwordHandler = (event) => {
        setPassword(event.target.value);
    }

    const submitLoginHandler = async (event) => {
        event.preventDefault();

        const { data } = await axios.post(loginRoute, {
          username,
          password,
        });

        

       
    
        if (data.status === false) {
          console.error("User not logged in");
        }

       if(data.status === true) {
        dispatch(setUser(data.user));
        navigate('/chat')
       }
    }

    return (

    <Box sx={{display:'flex', alignItems:'center', justifyContent:'center', mt:10}}>
      <Card sx={{ minWidth: 400, minHeight:200 }}>
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
      <Box sx={{maxWidth:400, justifyContent:'center'}}>
        <Box sx={{maxWidth:400, display:'flex', justifyContent:'center'}}>
        <Typography sx={{fontSize:25}}>Login</Typography>
        </Box>
        <Input placeholder="Type your username" type="text" sx={{m:1}} onChange={usernameHandler} />
        <Input placeholder="Type your password" type="password" sx={{m:1}} onChange={passwordHandler} />
        <Box sx={{display:'flex', justifyContent:'center'}}>
        <Button  onClick={submitLoginHandler} >Login </Button>
        </Box>
        </Box>
      </Card>
      </Box>
        
    );

}

export default WelcomeLoginView;