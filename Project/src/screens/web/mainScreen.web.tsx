import React from "react";
import TopBar from "../../components/web/TopBar.web";
import GoogleMapsComponent from "../../components/web/GoogleMap.web";
import AddMachineForm from "../../components/web/AddMachineForm.web";
import Footer from "../../components/web/Footer.web";
import { Image } from "react-native";
import { User } from "../../components/shared/user";
import { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';



const MainScreenWeb: React.FC = () => {
  const location = useLocation();
  const user = location.state?.user as User | null;
  const handleSignInPress = () => {};


  return (
    <div className="bg-my-orange min-h-screen flex flex-col overflow-auto">
      <TopBar title="Kafence" onButtonPress={handleSignInPress} />

      <div className="flex flex-col justify-center items-center p-5">
        <h1 className="text-center text-5xl font-bold text-my-black font-customFont pb-5">
          Обичаш кафе?
        </h1>
        <h3 className="text-center text-3xl font-semibold text-my-black font-customFont pb-16">
          Намери най близката кафе машина в района ти за секунди!
        </h3>
        <GoogleMapsComponent user={user}/>
      </div>

      <div className="flex flex-row justify-between p-12 mx-10">
        <div className="flex flex-col flex-1 items-center justify-center">
          <p className="text-3xl font-bold text-my-black font-customFont mb-4">
            Още за Кафенце!
          </p>
          <p className="text-xl text-my-black font-customFont text-center leading-9 tracking-wide">
            В съвременния свят любовта ви към кафето не трябва да бъде жертвана
            заради натовареното ежедневие. Независимо дали сте фен на италианско
            еспресо или предпочитате топло капучино, сега е по-лесно от всякога
            да намерите идеалната кафемашина.
          </p>
        </div>

        <div className="flex-1 flex justify-end mx-10 max-w-full h-auto">
          <Image
          source = {require('../../../assets/coffee_cup.png')}/>
        </div>
      </div>
      <div className = "w-full max-w-full">
      <AddMachineForm/>
      </div>
      <div className = "mt-20 ">
      <Footer/>
      </div>
    </div>
  );
};

export default MainScreenWeb;
