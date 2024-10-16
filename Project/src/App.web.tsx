import './styles/globals.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { MsalProvider} from '@azure/msal-react';
import { PublicClientApplication } from '@azure/msal-browser';
import { msalConfig } from './authConfig';

const msalInstance = new PublicClientApplication(msalConfig);


import HomeScreen from './screens/mainScreen';
import LogIn from './screens/Login.web';

const App = () => {
  return (
    <MsalProvider instance={msalInstance}>
    <Router>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/login" element={<LogIn />} />
      </Routes>
    </Router>
    </MsalProvider>
  );
};

export default App;
