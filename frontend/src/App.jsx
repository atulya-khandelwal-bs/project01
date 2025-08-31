import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} /> {/* Home Page */}
        <Route path="/login" element={<Login />} /> {/* Login Page */}
      </Routes>
    </Router>
  );
};

export default App;
