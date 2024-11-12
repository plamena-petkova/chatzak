import {
  Box,
  Button,
  Input,
  Typography,
} from "@mui/joy";
import logo from "../assets/chatzakLogo.png";
import "../App.css";
import SendIcon from "@mui/icons-material/Send";

import homePic from "../assets/remote-5491798_1280.png";
import { useEffect, useState } from "react";
import { isValidEmail } from "../utils/validEmail";
import { useNavigate } from "react-router-dom";
import { setEmailHomePage } from "../store/authReducer";
import { useDispatch, useSelector } from "react-redux";

function HomeView() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  //const isLargeScreen = useMediaQuery("(min-width:900px)");
  //const isSmallScreen = useMediaQuery("(max-width:899px)");

  const text = "Chat Now. Connect Always.";
  const speed = 500;

  const emailHomePage = useSelector((state) => state.auth.emailHomePage);

  const [displayedText, setDisplayedText] = useState("");
  const words = text.split(" ");
  const [index, setIndex] = useState(0);
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    if (index >= words.length) return;

    const intervalId = setInterval(() => {
      setDisplayedText((prev) => prev + (prev ? " " : "") + words[index]);
      setIndex((prev) => prev + 1);
    }, speed);

    return () => clearInterval(intervalId);
  }, [index, words, speed]);

  const handleEmail = (e) => {
    if (!isValidEmail(e.target.value)) {
      setError(true);
    } else {
      setError(false);
    }

    setEmail(e.target.value);
    dispatch(setEmailHomePage(e.target.value))
  };

  console.log('error', error);

  const handleRegister = () => {
    if (isValidEmail(email)) {
      navigate("/register");
    }
  };

  useEffect(() => {
    if(emailHomePage) {
      dispatch(setEmailHomePage(''))
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Box
      sx={{
        height: "100vh",
        width: "98.93vw",
        background: "linear-gradient(26deg, #26a1df 20%, #29a5ae 74%)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "1px solid transparent",
          boxShadow: "0px 7px 10px rgba(0, 0, 0, 0.3)",
          p: "1rem",
        }}
      >
        <Box>
          <img width={"120px"} height={"70px"} src={logo} alt="logo" />
        </Box>
        <Box>
          <Button
            component="a"
            variant="solid"
            sx={{ mr: 4 }}
            href="/login"
            data-testid="button"
          >
            Login
          </Button>
          <Button
            component="a"
            variant="solid"
            sx={{ mr: 4 }}
            href="/register"
            data-testid="button"
          >
            Sign Up
          </Button>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          maxWidth: "60%",
          minHeight: "30vh",
          justifyContent: "center",
          textAlign: "center",
          p: "1.5rem",
          alignItems: "center",
          mx: "auto",
          alignContent: "center",
        }}
      >
        <Typography
          sx={{ fontSize: "3rem", fontWeight: "bold", color: "white" }}
        >
          {displayedText}
        </Typography>
      </Box>
      <Box>
        <Input
          placeholder="Email"
          endDecorator={
            <Button
              onClick={() => handleRegister()}
              sx={{ pr: "1rem", mr: "0.25rem" }}
              variant="soft"
            >
              <SendIcon />
            </Button>
          }
          sx={{
            maxWidth: "50%",
            justifyContent: "center",
            textAlign: "center",
            borderRadius: "2rem",
            pl: "1rem",
            pr: "1rem",
            pb:"0.5rem",
            pt:"0.5rem",
            alignItems: "center",
            mx: "auto",
            alignContent: "center",
          }}
          onChange={handleEmail}
          value={email}
        />
      </Box>
     <Box sx={{display:'flex', justifyContent:'center', pt:'1rem'}}>
      <img src={homePic} alt="homePicture" width={'600px'} height={'600px'} />
     </Box>
    </Box>
  );
}

export default HomeView;
/*
    <Box type="div">
      <Sheet
        sx={{
          m: 4,
          borderRadius: "30px",
          backgroundColor: "#C2ECFA",
          minHeight: "80vh",
          minWidth: "70vw",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2, pb: 2 }}>
          <CardCover sx={{ maxWidth: 200, maxHeight: 100 }}>
            <img
              style={{
                borderTopLeftRadius: "30px",
                borderBottomRightRadius: "30px",
              }}
              src={logo}
              alt="logo"
            />
          </CardCover>
          {isLargeScreen && (
            <>
              <Button
                component="a"
                variant="outlined"
                sx={{ mr: 4, mt: 2 }}
                href="/login"
                data-testid="button"
              >
                Login
              </Button>
              <Button
                component="a"
                variant="outlined"
                sx={{ mr: 4, mt: 2 }}
                href="/register"
                data-testid="button"
              >
                Sign Up
              </Button>
            </>
          )}
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
            m: 5,
            pr: 4,
            pb: 4,
            pt: 4,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              maxWidth: 350,
              m: 2,
            }}
          >
            <Typography level="h2">Welcome to Chatzak</Typography>
            <Typography level="h5" sx={{ mt: 2 }}>
              Chatzak is a modern chat application designed to connect people
              with ease. Whether you're looking to chat with friends, family, or
              colleagues, Chatzak offers a seamless and user-friendly
              experience.
            </Typography>
            <Typography level="h5" sx={{ mt: 2 }}>
              Enjoy features such as sending messages, sharing emojis, and
              staying connected with your loved ones. Get started now by
              registering for a new account.
            </Typography>
            <Button
              component="a"
              variant="solid"
              sx={{ mr: 4, mt: 2 }}
              href="/register"
            >
              Sign Up
            </Button>
            {isSmallScreen && (
              <Button
                component="a"
                variant="solid"
                sx={{ mr: 4, mt: 2 }}
                href="/login"
              >
                Login
              </Button>
            )}
          </Box>
          {isLargeScreen && (
            <Card
              sx={{ width: 350, border: "none", backgroundColor: "#C2ECFA" }}
            >
              <img src={homePic} alt="homePic" />
            </Card>
          )}
        </Box>
      </Sheet>
    </Box>
    */
