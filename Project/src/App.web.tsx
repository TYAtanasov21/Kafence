import './styles/globals.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import HomeScreen from './screens/web/mainScreen.web';
import LogIn from './screens/web/Login.web';
import Register from './screens/web/register.web';
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/login" element={<LogIn />} />
        <Route path = "/register" element = {<Register/>} />
      </Routes>
    </Router>
  );
};

export default App;
