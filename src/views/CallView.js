import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function CallView() {

  const navigate = useNavigate();

  const jitsiContainerRef = useRef(null);
  const roomName = useSelector((state) => state.chat.currentRoom);
  const currentUser = useSelector((state) => state.auth.user);


  useEffect(() => {
    const domain = "8x8.vc"; // Jitsi domain for JaaS
    const options = {
      roomName: roomName,
      parentNode: jitsiContainerRef.current,
      userInfo: { displayName: currentUser.names },
      jwt: currentUser.jitsiAccessToken,
      interfaceConfigOverwrite: {
        TOOLBAR_BUTTONS: ["microphone", "camera", "hangup"], // Limit toolbar
      },
      configOverwrite: {
        startWithAudioMuted: true,
        startWithVideoMuted: true,
      },
    };

    const api = new window.JitsiMeetExternalAPI(domain, options);

    api.addListener('readyToClose', () => {
      console.log('Meeting has ended or iframe is about to close');
      navigate('/chat');
    });

    return () => {
      api.dispose(); // Clean up on component unmount
    };
  }, [roomName, currentUser,navigate]);

  return (
    <div
      id="jaas-container"
      style={{ height: "100vh", width: "100%" }}
      ref={jitsiContainerRef}
    ></div>
  );
}

export default CallView;