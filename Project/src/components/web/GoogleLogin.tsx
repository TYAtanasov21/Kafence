import React, { useState } from 'react';
import { GoogleOAuthProvider, GoogleLogin, CredentialResponse } from '@react-oauth/google';

interface UserObject {
  id: string;
  name: string;
  email: string;
  picture: string;
}

const GoogleLoginComponent: React.FC = () => {
  const [user, setUser] = useState<UserObject | null>(null);
  const client_id = process.env.GOOGLE_CLIENT_ID;

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

  const onError = () => {
    console.error('Login failed: An error occurred during authentication');
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
<GoogleOAuthProvider clientId={client_id}>
  <div>
    <GoogleLogin
      theme="outline"
      size="large"
      type="standard"
      text="sign_in_with"
      onSuccess={onSuccess}
      onError={onError}
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
