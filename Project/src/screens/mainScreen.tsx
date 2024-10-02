import React from "react";
import TopBar from "../components/web/TopBar.web";
const MainScreenWeb:React.FC = () => {

  const handleSignInPress = () => {
    console.log('Navigating to Sign-In Page');
    // Implement your sign-in logic here
  };
    return (
      <div className="bg-my-orange w-screen h-screen">
        <TopBar title = "Kafence" onSignInPress={handleSignInPress} />
      </div>
    );
  };
  
export default MainScreenWeb;
  