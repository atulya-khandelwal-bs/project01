import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home.jsx';  // Your homepage component

const App = () => {
  return (
    // <Router>
    //   <Routes>

    //     <Route path="/" element={<Home />} />  {/* Home Page */}
    //     {/* Add other routes like Login, Signup if needed */}
    //   </Routes>
    // </Router>
    <Home />
  );
};

export default App;
