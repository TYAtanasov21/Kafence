import React from 'react';
import {TopBarProps}  from '../shared/TopBar';
import Feather from '@expo/vector-icons/Feather';
import { Link } from 'react-router-dom';
import { Image } from 'react-native';
import tailwind from 'twrnc';
const TopBar: React.FC<TopBarProps> = ({ title, onButtonPress }) => {
  return (
    <div className="flex items-center justify-between w-full h-20 px-4">
      {/* Logo */}
      <div className='pt-6'>
      <Image
      source = {require('../../../assets/logo-web-page.png')}
      style = {tailwind`pt-6`}
      />
      </div>
      <Link to = "/login">
      <button onClick={onButtonPress} className="p-2">
        <span className="material-icons text-black">
            <Feather name="user" size={43} color="black" />
        </span>
      </button>
      </Link>
    </div>
  );
};

export default TopBar;
