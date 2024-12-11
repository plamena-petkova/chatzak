import { Box, Button, Grid, Input, Typography } from "@mui/joy";
import logo from "../assets/chatzakLogo.png";
import "../App.css";
import SendIcon from "@mui/icons-material/Send";
import chatBubbleIcon from "../assets/chatBubble_icon.png";
import emojiIcon from "../assets/emoji_icon_heart.png";
import shareIcon from "../assets/share_icon.png";
import homePic from "../assets/remote-5491798_1280.png";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import { useEffect, useState } from "react";
import { isValidEmail } from "../utils/validEmail";
import { useNavigate } from "react-router-dom";
import { setEmailHomePage } from "../store/authReducer";
import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from "@mui/material";
import FeaturesComponent from "../components/FeaturesComponent";

function HomeView() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  //const isLargeScreen = useMediaQuery("(min-width:900px)");
  const isSmallScreen = useMediaQuery("(max-width:899px)");

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
    dispatch(setEmailHomePage(e.target.value));
  };

  console.log("error", error);

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

  return (
    <Box
      sx={{
        height: "600px",
        width: "100vw",
        background: "linear-gradient(136deg, #26a1df 20%, #1b4680)",
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
            color="success"
            sx={{ mr: 4 }}
            href="/login"
            data-testid="button"
          >
            Login
          </Button>
          <Button
            component="a"
            variant="solid"
            color="danger"
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
          background:'#FFFFF'
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
      <Box sx={{backgroundColor:'#F0F0F0'}}>
      <Grid
        container
        spacing={4}
        sx={{
          maxWidth:'90vw',
          margin:'0 auto',
          alignItems: "center",
          textAlign: "center",
          pb: "2rem",
        }}
      >
        <Grid md={4} xs={12}>
          <Box>
            <img
              src={chatBubbleIcon}
              alt="chat_bubble"
              width={"100px"}
              height={"100px"}
            />
            <Typography sx={{ fontSize: "xl", fontWeight: "bold" }}>
              Instant Messaging
            </Typography>
            <Typography fontSize={"md"}>
              Chat instantly with your friends or community members through a
              quick and seamless one-on-one messaging experience.
            </Typography>
          </Box>
        </Grid>
        <Grid md={4} xs={12}>
          <Box>
            <img
              src={emojiIcon}
              alt="emoji_icon_heart"
              width={"100px"}
              height={"100px"}
            />
            <Typography sx={{ fontSize: "xl", fontWeight: "bold" }}>
              Send Emojis
            </Typography>
            <Typography fontSize={"md"}>
              Express yourself better with a variety of fun and creative emojis.
              Add a personal touch to your conversations effortlessly!
            </Typography>
          </Box>
        </Grid>
        <Grid md={4} xs={12}>
          <Box>
            <img
              src={shareIcon}
              alt="share_icon"
              width={"100px"}
              height={"100px"}
            />
            <Typography sx={{ fontSize: "xl", fontWeight: "bold" }}>
              Share Pictures
            </Typography>
            <Typography fontSize={"md"}>
              Easily share your favorite moments by sending pictures to your
              friends or community. Keep your memories alive with just a click!
            </Typography>
          </Box>
        </Grid>
      </Grid>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
           backgroundColor:'#F0F0F0'
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
