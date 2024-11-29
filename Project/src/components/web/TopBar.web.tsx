import React from 'react';
import {TopBarProps}  from '../shared/TopBar';
import Feather from '@expo/vector-icons/Feather';
import { Link } from 'react-router-dom';
import { Image } from 'react-native';
import tailwind from 'twrnc';
import { User } from "../../components/shared/user";
import { useLocation } from 'react-router-dom';
const TopBar: React.FC<TopBarProps> = ({ title, onButtonPress }) => {
  const location = useLocation();
  const user = location.state?.user as User | null;

  const getGreeting = () => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      return "Добро утро";
    } else if (currentHour < 18) {
      return "Добър ден";
    } else {
      return "Добър вечер";
    }
  };


  return (
    <div className="flex items-center justify-between w-full h-20 px-4">
      <div className='pt-6'>
      <Image
      source = {require('../../../assets/logo-web-page.png')}
      style = {tailwind`pt-6`}
      />
      </div>
      <div className = "flex flex-row ">
        {user && 
        <h2 className = "font-bold text-xl items-center p-4">{getGreeting()}, {user?.username}</h2>}
      <Link to = "/login">
      <button onClick={onButtonPress} className="p-2">
        <span className="material-icons text-black">
            <Feather name="user" size={43} color="black" />
        </span>
      </button>
      </Link>
      </div>
    </div>
  );
};

export default TopBar;
