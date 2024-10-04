import React from "react";
import TopBar from "../components/web/TopBar.web";

const MainScreenWeb: React.FC = () => {

  const handleSignInPress = () => {
  };

  return (
    <div className="bg-my-orange w-screen h-screen flex flex-col">
      <TopBar title="Kafence" onSignInPress={handleSignInPress} />
        
      <div className="flex flex-col justify-center items-center p-5">
        <h1 className="text-center text-5xl font-bold text-my-black font-customFont pb-5">Обичаш кафе?</h1>
        <h3 className = "text-center text-3xl font-semibold text-my-black font-customFont pb-10">Намери най близката кафе машина в района ти за секунди!</h3>
        <img src = "../../assets/google-maps-test.png" alt = "Google maps pic"></img>
      </div>
      <p>{process.env.KEY}</p>

    </div>
  );
};

export default MainScreenWeb;
