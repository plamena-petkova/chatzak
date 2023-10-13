import ChatView from "./views/ChatView";
import LoginView from "./views/LoginView";
import "./App.css";
import React from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import RegisterView from "./views/RegisterView";

function App() {


  return (
    <div className="background">
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/login" element={<LoginView />} />
          <Route path="/register" element={<RegisterView />} />
          <Route
            path="/chat"
            element={<ChatView />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
