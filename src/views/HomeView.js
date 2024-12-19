import { Box, Button, Grid, Input, Typography } from "@mui/joy";
import logo from "../assets/chatzakLogo.png";
import "../App.css";
import SendIcon from "@mui/icons-material/Send";
import homePic from "../assets/remote-5491798_1280.png";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import { useEffect, useState } from "react";
import { isValidEmail } from "../utils/validEmail";
import { useNavigate } from "react-router-dom";
import { logout, setEmailHomePage } from "../store/authReducer";
import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from "@mui/material";
import FeaturesComponent from "../components/FeaturesComponent";
import FunctionalitiesComponent from "../components/FunctionalitiesComponent";

function HomeView() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  //const isLargeScreen = useMediaQuery("(min-width:900px)");
  const isSmallScreen = useMediaQuery("(max-width:899px)");

  const text = "Chat Now. Connect Always.";
  const speed = 500;

  const emailHomePage = useSelector((state) => state.auth.emailHomePage);
  const currentUser = useSelector((state) => state.auth.user);

  const [displayedText, setDisplayedText] = useState("");
  const words = text.split(" ");
  const [index, setIndex] = useState(0);
  const [email, setEmail] = useState("");
  // eslint-disable-next-line no-unused-vars
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
    dispatch(setEmailHomePage(e.target.value));
  };


  const handleRegister = () => {
    if (isValidEmail(email)) {
      navigate("/register");
    }
  };

  useEffect(() => {
    if (emailHomePage) {
      dispatch(setEmailHomePage(""));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Box
      sx={{
        height: "600px",
        width: "100vw",
        background: "linear-gradient(136deg, #26a1df 20%, #1b4680)",
        position: "relative",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection:"row",
          alignItems: "center",
          background: "linear-gradient(136deg, #26a1df 20%, #1b4680)",
          width: "100vw",
          height: "15vh",
          justifyContent: "space-between",
          borderBottom: "1px solid transparent",
          boxShadow: "0px 7px 10px rgba(0, 0, 0, 0.3)",
          p: "2rem",
          mb: "3rem",
          position: "fixed",
          zIndex: "100",
        
        }}
      >
        <Box>
          <img width={"120px"} height={"70px"} src={logo} alt="logo" />
        </Box>
        <Box sx={{display:'flex', flexDirection:isSmallScreen ? "column" : "row", justifyContent:'space-between'}}>
          <Button
            component="a"
            variant="plain"
            href="/about"
            data-testid="button"
            sx={{
         
              color: "white",
              "&:hover": {
                background: "#26a1df",
              },
            }}
          >
            About
          </Button>
          <Button
            component="a"
            variant="plain"
            href="/pricing"
            data-testid="button"
            sx={{
              color: "white",
              "&:hover": {
                background: "#26a1df",
              },
            }}
          >
            Pricing
          </Button>
          {currentUser?.names && <Button
            component="a"
            variant="plain"
            href="/chat"
            data-testid="chat-button"
            sx={{
              color: "white",
              "&:hover": {
                background: "#26a1df",
              },
            }}
          >Chat</Button>}
        </Box>
        {!currentUser?.names ? (
          <Box>
            <Button
              component="a"
              variant="solid"
              color="success"
              sx={{mr:'10px'}}
              href="/login"
              data-testid="button"
            >
              Login
            </Button>
            <Button
              component="a"
              variant="solid"
              color="danger"
              href="/register"
              data-testid="button"
            >
              Sign Up
            </Button>
          </Box>
        ) : (
          <Box sx={{display:'flex', flexDirection:'row', alignItems:'center'}}>
            <Typography sx={{ fontWeight: 500, color: "white", mr:'10px' }}>
              Hello, {currentUser.names}
            </Typography>
            <Button data-testid="logout-button" color="danger" onClick={handleLogout}>
              Log Out
            </Button>
          </Box>
        )}
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          maxWidth: "60%",
          minHeight: "30vh",
          justifyContent: "center",
          textAlign: "center",
          p: "5rem",
          alignItems: "center",
          mx: "auto",
          alignContent: "center",
        }}
      >
        <Typography
          sx={{
            fontSize: "3rem",
            fontWeight: "bold",
            color: "white",
            pt: "3rem",
          }}
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
              data-testid="send-button"
            >
              <SendIcon />
            </Button>
          }
          sx={{
            maxWidth: isSmallScreen ? "70%" : "50%",
            justifyContent: "center",
            textAlign: "center",
            borderRadius: "2rem",
            pl: "1rem",
            pr: "1rem",
            pb: "0.5rem",
            pt: "0.5rem",
            alignItems: "center",
            mx: "auto",
            alignContent: "center",
          }}
          onChange={handleEmail}
          value={email}
          data-testid="email-input"
        />
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          pt: "1rem",
          mb: isSmallScreen ? "5rem" : "1rem",
          background: "#FFFFF",
        }}
      >
        <img
          src={homePic}
          alt="homePicture"
          style={{
            width: isSmallScreen ? "80%" : "50%",
            height: "auto",
            maxWidth: { xs: "80px", sm: "100px", md: "300px" },
          }}
        />
      </Box>
      <Box sx={{ backgroundColor: "#F0F0F0" }}>
        <FunctionalitiesComponent />
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          backgroundColor: "#F0F0F0",
        }}
      >
        <Typography
          sx={{
            fontSize: "30px",
            fontWeight: "600",
            alignSelf: "center",
            pt: "4rem",
          }}
        >
          Amazing Features
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignContent: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            sx={{
              fontSize: "20px",
              fontWeight: "400",
              alignSelf: "center",
              p: "1.5rem",
            }}
          >
            Features that every chat application needs! Whether you want to send
            a 1:1 message, send a picture or emojis.{" "}
          </Typography>
        </Box>

        <FeaturesComponent />
      </Box>
      <Grid
        container
        spacing={10}
        sx={{ background: "#1b4680", margin: "0 auto" }}
      >
        <Grid xs={12} md={6}>
          <Typography sx={{ color: "white" }}>
            Stay connected anytime, anywhere with ChatZak. Send messages,
            emojis, and more—all users in one place. Try it today! ChatZak keeps
            everyone together—effortlessly connect, share, and communicate in
            one platform.
          </Typography>
        </Grid>

        <Grid xs={12} md={3}>
          <Box>
            <Typography sx={{ color: "white" }}>About</Typography>
            <Typography sx={{ color: "white" }}>Pricing</Typography>
            <Typography sx={{ color: "white" }}>Cookie Policy</Typography>
          </Box>
        </Grid>
        <Grid xs={12} md={3}>
          <Box>
            <Typography sx={{ color: "white" }}>Contact Us:</Typography>
            <Typography sx={{ color: "white" }}>chatzak@gmail.com</Typography>
            <Box>
              <Button variant="plain">
                <InstagramIcon color="action" />
              </Button>
              <Button variant="plain">
                <FacebookIcon color="action" />
              </Button>
              <Button variant="plain">
                <GitHubIcon color="action" />
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default HomeView;
