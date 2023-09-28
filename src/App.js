import ChatView from "./views/ChatView";
import WelcomeLoginView from "./views/WelcomeLoginView";
import '../src/App.css';

import { BrowserRouter, Route, Routes } from "react-router-dom";
import RegisterView from "./views/RegisterView";

function App() {
  return (
    <div className="background">
     
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/login" element={<WelcomeLoginView />} />
          <Route path="/register" element={<RegisterView />} />
          <Route path="/chat" element={<ChatView />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
