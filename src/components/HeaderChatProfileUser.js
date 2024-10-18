import { Avatar, Box, Divider, Typography } from "@mui/joy";
import DrawerUserProfile from "./DrawerUserProfile";
import SearchBarMessages from "./SearchBarMessages";

function HeaderChatProfileUser({ chat, search, goNext, goPrevious, currentIndex, indexes }) {

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          m: 1,
        }}
      >
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

          <Typography sx={{ fontSize: 16, fontWeight: "bold", ml: 2 }}>
            {chat?.names}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "row", flexWrap:'no-wrap' }}>
          <SearchBarMessages searchMessages={search} goNext={goNext} goPrevious={goPrevious} currentIndex={currentIndex} indexes={indexes} />
          <DrawerUserProfile currentContact={chat} />
        </Box>
      </Box>

      <Divider />
    </>
  );
}

export default HeaderChatProfileUser;
