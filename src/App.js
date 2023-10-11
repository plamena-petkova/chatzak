import ChatView from "./views/ChatView";
import LoginView from "./views/LoginView";
import "../src/App.css";
import React, { useState, useEffect } from "react";
import { socket } from "./socket";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import RegisterView from "./views/RegisterView";

function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);

  return (
    <div className="background">
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/login" element={<LoginView />} />
          <Route path="/register" element={<RegisterView />} />
          <Route
            path="/chat"
            element={<ChatView isConnected={isConnected} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
