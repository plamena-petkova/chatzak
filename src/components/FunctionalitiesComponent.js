import { Box, Grid, Typography } from "@mui/joy";
import chatBubbleIcon from "../assets/chatBubble_icon.png";
import emojiIcon from "../assets/emoji_icon_heart.png";
import shareIcon from "../assets/share_icon.png";
import callIcon from "../assets/call_icon.png";

function FunctionalitiesComponent() {
  return (
    <Grid
      container
      spacing={4}
      sx={{
        maxWidth: "95vw",
        margin: "0 auto",
        alignItems: "center",
        textAlign: "center",
        pb: "2rem",
      }}
    >
      <Grid md={3} xs={12}>
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
      <Grid md={3} xs={12}>
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
      <Grid md={3} xs={12}>
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
      <Grid md={3} xs={12}>
        <Box>
          <img
            src={callIcon}
            alt="call_icon"
            width={"100px"}
            height={"100px"}
          />
          <Typography sx={{ fontSize: "xl", fontWeight: "bold" }}>
            Make Calls
          </Typography>
          <Typography fontSize={"md"}>
            Connect effortlessly with your friends or community through calls.
            Share laughs, stories, and experiences in real time and create
            lasting memories with just a dial!
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
}

export default FunctionalitiesComponent;
