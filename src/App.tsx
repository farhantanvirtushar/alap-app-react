/* eslint-disable */
import React, { useState } from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Routings from "./routes/Routings";

import { io } from "socket.io-client";
import { getUserId } from "./common/Utils";
import { Message } from "./models/message/Message";
import { useStore } from "react-redux";
const socket = io("http://localhost:5000");

function App() {
  const [isConnected, setIsConnected] = useState<boolean>(false);

  React.useEffect(() => {
    socket.on("connect", () => {
      setIsConnected(true);
      console.log("connected");
      socket.emit("add-user", getUserId());
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
      console.log("disconnected");
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
    };
  }, []);
  return (
    <div className="App">
      <BrowserRouter>
        <Routings socket={socket} />
      </BrowserRouter>
    </div>
  );
}

export default App;
