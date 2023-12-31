import ChatView from "./views/ChatView";
import LoginView from "./views/LoginView";
import "./App.css";
import React from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import RegisterView from "./views/RegisterView";
import PrivateRoutes from "./components/PrivateRoutes";
import HomeView from "./views/HomeView";

function App() {
  return (
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
  );
}
export default App;
