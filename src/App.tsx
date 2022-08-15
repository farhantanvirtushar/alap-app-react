import React from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Routings from "./routes/Routings";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routings />
      </BrowserRouter>
    </div>
  );
}

export default App;
