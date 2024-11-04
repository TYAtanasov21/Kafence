import './styles/globals.css';
import React from 'react';
import {MainScreenMobile} from './screens/mobile/mainScreen.mobile';

export const App = () => {
  console.log(process.env.KEY);
  return <MainScreenMobile/>;
};


