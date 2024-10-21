import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './login';
import Signup from './signup';
import Profile from './profile';
import AboutUs from './about_us';
import Main from './main'; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/about_us" element={<AboutUs />} />
        <Route path="/main" element={<Main />} />
        <Route path="*" element={<Main />} /> {/* Default route */}
      </Routes>
    </Router>
  );
}

export default App;
