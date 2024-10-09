import { Avatar, Box, Divider, Typography } from "@mui/joy";

function HeaderChatProfileUser({ chat }) {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          m: 1,
        }}
      >
        {chat?._id && (
          <Avatar key={chat?._id} src={`${chat?.avatarImg}`}>
            {chat._id && chat?.avatarImg ? chat?.avatar : chat.names[0]}
          </Avatar>
        )}

        <Typography sx={{ fontSize: 16, fontWeight: "bold" }}>
          {chat?.names}
        </Typography>
      </Box>
      <Divider />
    </>
  );
}

export default HeaderChatProfileUser;
