// App.js
import ChatView from "./views/ChatView";
import LoginView from "./views/LoginView";
import "./App.css";
import React, { createContext, useContext, useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RegisterView from "./views/RegisterView";
import PrivateRoutes from "./components/PrivateRoutes";
import HomeView from "./views/HomeView";
import { socket } from "./socket";

const SocketContext = createContext();

export const useSocket = () => useContext(SocketContext);

function SocketProvider({ children }) {
  const [socketId, setSocketId] = useState(null);

  useEffect(() => {
    const socketConnection = socket; // replace with your server URL
    setSocketId(socketConnection);

    socketConnection.on("connect", () => {
      console.log("Socket connected:", socketConnection.id);
    });

    socketConnection.on("disconnect", () => {
      console.log("Socket disconnected");
    });

    return () => {
      socketConnection.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={socketId}>
      {children}
    </SocketContext.Provider>
  );
}

function App() {
  return (
    <SocketProvider>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<HomeView />} />
          <Route path="/login" element={<LoginView />} />
          <Route path="/register" element={<RegisterView />} />
          <Route element={<PrivateRoutes />}>
            <Route path="/chat" element={<ChatView />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </SocketProvider>
  );
}

export default App;
