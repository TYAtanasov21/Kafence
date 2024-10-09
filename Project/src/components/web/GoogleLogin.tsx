import React, { useState } from 'react';
import { GoogleOAuthProvider, GoogleLogin, CredentialResponse } from '@react-oauth/google';
import Constants from 'expo-constants';
import { GOOGLE_CLIENT_ID } from '@env';

// Define the UserObject interface
interface UserObject {
  id: string;    // The user's Google ID
  name: string;  // The user's name
  email: string; // The user's email
  picture: string; // The user's profile picture URL
}

const GoogleLoginComponent: React.FC = () => {
  const [user, setUser] = useState<UserObject | null>(null);

  // Function to handle successful login
  const onSuccess = (credentialResponse: CredentialResponse) => {
    if (credentialResponse.credential) {
      const userProfile = parseJwt(credentialResponse.credential);
      if (userProfile) {
        setUser(userProfile);
        console.log('Login Success: current user:', userProfile);
      } else {
        console.error('Failed to parse user profile');
      }
    } else {
      console.error('No credential found');
    }
  };

  // Function to handle errors (updated to match expected type)
  const onError = () => {
    console.error('Login failed: An error occurred during authentication'); // Fixed error message
  };

  // Function to parse JWT and extract user profile
  const parseJwt = (token: string) => {
    const base64Url = token.split('.')[1];
    if (base64Url) {
      const base64 = decodeURIComponent(atob(base64Url).split('').map((c) =>
        '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''));
      return JSON.parse(base64) as UserObject;
    }
    return null;
  };
    console.log("Google Client ID:", GOOGLE_CLIENT_ID);
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <div>
        <h2>Login with Google</h2>
        <GoogleLogin
          onSuccess={onSuccess}
          onError={onError} // Updated to match the expected type
        />
        {user && (
          <div>
            <h3>Welcome, {user.name}</h3>
            <img src={user.picture} alt={user.name} />
          </div>
        )}
      </div>
    </GoogleOAuthProvider>
  );
};

export default GoogleLoginComponent;
