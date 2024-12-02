import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { refreshJitsiAccessToken } from "../store/authReducer";

function CallView() {

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const jitsiContainerRef = useRef(null);
  const roomName = useSelector((state) => state.chat.currentRoom);
  const currentUser = useSelector((state) => state.auth.user);
  const jitsiAccessToken = useSelector((state) => state.auth.jitsiAccessToken);

  function isTokenExpired(token) {
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const decoded = JSON.parse(atob(base64));
  
      const currentTime = Math.floor(Date.now() / 1000);
      return decoded.exp < currentTime; 
    } catch (error) {
      console.error("Error decoding token:", error);
      return true; 
    }
  }


  useEffect(() => {
    if (!currentUser?.jitsiAccessToken || isTokenExpired(currentUser.jitsiAccessToken)) {
      dispatch(refreshJitsiAccessToken(currentUser));
    }

    const domain = "8x8.vc";
    const options = {
      roomName: roomName,
      parentNode: jitsiContainerRef.current,
      userInfo: { displayName: currentUser.names },
      jwt: jitsiAccessToken,
      interfaceConfigOverwrite: {
        TOOLBAR_BUTTONS: ["microphone", "camera", "hangup"], 
      },
      configOverwrite: {
        startWithAudioMuted: true,
        startWithVideoMuted: true,
        prejoinPageEnabled: false,
      },
    };

    const api = new window.JitsiMeetExternalAPI(domain, options);

    api.addListener('readyToClose', () => {
      console.log('Meeting has ended or iframe is about to close');
      navigate('/chat');
    });

    api.addListener("connectionFailed", (event) => {
      const errorMessage =
        event.message || event.errorMessage || JSON.stringify(event);

      if (errorMessage.includes("exp") || errorMessage.includes("expired")) {
        console.error("Token expired:", errorMessage);

      } else if (event.error === "connection.passwordRequired") {
        console.error("Authentication error: Password or token issue.");
      } else {
        console.error("Connection failed:", event);
      }
    });

    return () => {
      api.dispose(); 
    };
  }, [roomName, currentUser,navigate, dispatch, jitsiAccessToken]);

  return (
    <div
      id="jaas-container"
      style={{ height: "100vh", width: "100%" }}
      ref={jitsiContainerRef}
    ></div>
  );
}

export default CallView;