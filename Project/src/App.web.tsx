import './styles/globals.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import HomeScreen from './screens/mainScreen';
import LogIn from './screens/Login.web';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/login" element={<LogIn />} />
      </Routes>
    </Router>
  );
};

export default App;
