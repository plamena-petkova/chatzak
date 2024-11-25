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
      return decoded.exp < currentTime; // Returns true if token is expired
    } catch (error) {
      console.error("Error decoding token:", error);
      return true; // Treat as expired if decoding fails
    }
  }


  useEffect(() => {
    if (!currentUser?.jitsiAccessToken || isTokenExpired(currentUser.jitsiAccessToken)) {
      alert("Your session has expired. Creating new token");
      dispatch(refreshJitsiAccessToken(currentUser));
      
    }


    const domain = "8x8.vc"; // Jitsi domain for JaaS
    const options = {
      roomName: roomName,
      parentNode: jitsiContainerRef.current,
      userInfo: { displayName: currentUser.names },
      jwt: jitsiAccessToken,
      interfaceConfigOverwrite: {
        TOOLBAR_BUTTONS: ["microphone", "camera", "hangup"], // Limit toolbar
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

        // Show user-friendly feedback
        alert("Your session has expired. Please log in again to join the meeting.");

        // Optionally, redirect the user to a login page
        navigate("/login");
      } else if (event.error === "connection.passwordRequired") {
        console.error("Authentication error: Password or token issue.");
      } else {
        console.error("Connection failed:", event);
      }
    });



    return () => {
      api.dispose(); // Clean up on component unmount
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