import ChatView from "./views/ChatView";
import LoginView from "./views/LoginView";
import "./App.css";
import React, { createContext, useContext, useEffect} from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RegisterView from "./views/RegisterView";
import PrivateRoutes from "./components/PrivateRoutes";
import HomeView from "./views/HomeView";
import { socket } from "./socket";
import { useSelector } from "react-redux";

const SocketContext = createContext();

export const useSocket = () => useContext(SocketContext);

function SocketProvider({ children }) {
  const user = useSelector((state) => state.auth.user);

  const socketConnection = socket;

  useEffect(() => {

    if (socketConnection) {
      socketConnection.on("connect", () => {
        if (user) {
          socketConnection.emit("add-user", user._id);
        }
      });

      socketConnection.on("disconnect", () => {});
    }

    return () => {
      socketConnection.off("connect");
      socketConnection.off("disconnect");
      socketConnection.disconnect();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SocketContext.Provider value={socketConnection}>
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
