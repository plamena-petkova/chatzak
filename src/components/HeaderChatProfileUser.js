import { Avatar, Box, Divider, Typography } from "@mui/joy";
import DrawerUserProfile from "./DrawerUserProfile";
import SearchBarMessages from "./SearchBarMessages";
import { useSelector } from "react-redux";

function HeaderChatProfileUser({
  chat,
  search,
  goNext,
  goPrevious,
  isBlocked,
}) {
  const currentUser = useSelector((state) => state.auth.user);

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
        {currentUser.blockedUsers?.includes(chat._id) ? (
          <Typography color="danger">You block this user</Typography>
        ) : null}
        {isBlocked ? (
          <Typography color="danger">You were blocked</Typography>
        ) : null}

        <Box
          sx={{ display: "flex", flexDirection: "row", flexWrap: "no-wrap" }}
        >
          <SearchBarMessages
            searchMessages={search}
            goNext={goNext}
            goPrevious={goPrevious}
          />
          <DrawerUserProfile currentContact={chat} />
        </Box>
      </Box>

      <Divider />
    </>
  );
}

export default HeaderChatProfileUser;
//        {(blockAlert && currentUser && (blockAlert?._id === currentUser._id)) ? <Typography color="danger">You were blocked</Typography> : null}
//{isBlocked ? <Typography color="danger">You blocked the user</Typography> : null}
