/* eslint-disable */
import React, { useState } from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Routings from "./routes/Routings";

import { io } from "socket.io-client";
import { getUserId } from "./common/Utils";
import { Message } from "./models/message/Message";
const socket = io("http://localhost:5000");

function App() {
  const [time, setTime] = useState("fetching");
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [lastPong, setLastPong] = useState<string>("");

  React.useEffect(() => {
    socket.on("connect", () => {
      setIsConnected(true);
      console.log("connected");
      socket.emit("add-user", getUserId());
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
      setTime("server disconnected");
      console.log("disconnected");
    });

    socket.on("time", (data) => {
      setTime(data);
      console.log(data);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("pong");
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
