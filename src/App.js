import React from "react";
import {
  BrowserRouter as Router,
  Routes as MyRoute,
  Route,
} from "react-router-dom";
import "./App.css";
import Home from "./screens/Home";
import Login from "./screens/Login";
import SignUp from "./screens/SignUp";

function App() {

  return (
    <Router>
      <MyRoute>
        <Route exact path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<Home />} />
      </MyRoute>
    </Router>
  ); 
  
}

export default App;
