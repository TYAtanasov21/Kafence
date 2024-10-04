import React from 'react';
import {TopBarProps}  from '../shared/TopBar';
import Feather from '@expo/vector-icons/Feather';
import { Link } from 'react-router-dom';

const TopBar: React.FC<TopBarProps> = ({ title, onSignInPress }) => {
  return (
    <div className="flex items-center justify-between w-full h-20 px-4">
      {/* Logo */}
      <img
        src="../../../assets/logo-web-page.png"
        alt="Logo"
        className="pt-6"
      />
      <Link to = "/login">
      <button onClick={onSignInPress} className="p-2">
        <span className="material-icons text-black">
            <Feather name="user" size={43} color="black" />
        </span>
      </button>
      </Link>
    </div>
  );
};

export default TopBar;
