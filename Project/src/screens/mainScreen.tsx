import React from "react";
import TopBar from "../components/web/TopBar.web";
const MainScreenWeb:React.FC = () => {

  const handleSignInPress = () => {
    alert("SIgn in");
  };
  
    return (
      <div className="bg-my-orange w-screen h-screen">
        <TopBar title = "Kafence" onSignInPress={handleSignInPress} />
      </div>
    );
  };
  
export default MainScreenWeb;
  