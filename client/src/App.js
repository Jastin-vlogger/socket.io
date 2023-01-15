import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Chathjoin from "./Chathjoin";
import { useState } from "react";
import io from "socket.io-client"; // Add this
import Chat from "./pages/Chat";
const socket = io.connect("http://localhost:4000"); // Add this -- our server will run on port 4000, so we connect to it from here

function App() {
  const [username, setUsername] = useState(""); // Add this
  const [room, setRoom] = useState(""); // Add this

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              <Chathjoin
                username={username}
                setUsername={setUsername}
                room={room}
                setRoom={setRoom}
                socket={socket}
              />
            }
          />
          <Route
            path="/chat"
            element={<Chat username={username} room={room} socket={socket} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
