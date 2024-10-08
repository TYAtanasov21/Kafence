import React, { useState } from 'react';
import { GoogleOAuthProvider, GoogleLogin, CredentialResponse } from '@react-oauth/google';
import Constants from 'expo-constants';

interface UserObject {
  id: string;    // The user's Google ID
  name: string;  // The user's name
  email: string; // The user's email
  picture: string; // The user's profile picture URL
}

const GoogleLoginComponent: React.FC = () => {
  const [user, setUser] = useState<UserObject | null>(null);

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

  const onError = (error: any) => {
    console.log('Login failed: res:', error);
  };

  const parseJwt = (token: string) => {
    const base64Url = token.split('.')[1];
    if (base64Url) {
      const base64 = decodeURIComponent(atob(base64Url).split('').map((c) =>
        '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''));
      return JSON.parse(base64) as UserObject;
    }
    return null;
  };

  return (
    <GoogleOAuthProvider clientId={Constants.expoConfig?.extra?.googleClientID}>
      <GoogleLogin
        onSuccess={onSuccess}
      />
      {user && (
        <div>
          <h3>Welcome, {user.name}</h3>
          <img src={user.picture} alt={user.name} />
        </div>
      )}
    </GoogleOAuthProvider>
  );
};

export default GoogleLoginComponent;
