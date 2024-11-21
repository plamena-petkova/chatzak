import { JitsiMeeting } from "@jitsi/react-sdk";
import { Box, Typography } from "@mui/joy";
import { useDispatch, useSelector } from "react-redux";
import { setIsMeetingActive } from "../store/chatReducer";

function CallView() {
  const dispatch = useDispatch();

  const currentRoom = useSelector((state) => state.chat.currentRoom);
  const currentUser = useSelector((state) => state.auth.currentUser);

  return (
    <Box>
      <JitsiMeeting
        domain={'meet.jit.si'}
        roomName={currentRoom}
        configOverwrite={{
          startWithAudioMuted: true,
          disableModeratorIndicator: true,
          startScreenSharing: true,
          enableEmailInStats: false,
        }}
        interfaceConfigOverwrite={{
          DISABLE_JOIN_LEAVE_NOTIFICATIONS: true,
        }}
        userInfo={{
          displayName: {currentUser},
        }}
        onApiReady={(externalApi) => {
          // here you can attach custom event listeners to the Jitsi Meet External API
          // you can also store it locally to execute commands
        }}
        getIFrameRef={(iframeRef) => {
          iframeRef.style.height = "400px";
        }}
      />
    </Box>
  );
}

export default CallView;

/*
<Box sx={{width:'100vw', height:'100vh'}}>
             <JitsiMeeting
            roomName={currentRoom}
            getIFrameRef={(iframe) => {
              iframe.style.height = "100%";
              iframe.style.width = "100%";
            }}
            userInfo={{
              displayName: currentUser?.names,
            }}
            configOverwrite={{
              prejoinPageEnabled: false,
            }}
            onReadyToClose={() => dispatch(setIsMeetingActive(false))}
          />
    
 
            
           
        </Box>
    )
*/
