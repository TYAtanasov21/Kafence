import React, { useEffect, useState } from 'react';
import { GoogleOAuthProvider, GoogleLogin, CredentialResponse } from '@react-oauth/google';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Image } from 'react-native';

interface UserObject {
  id: string;
  name: string;
  email: string;
  picture: string;
}
const LogIn: React.FC = () => {
  const client_id = process.env.GOOGLE_CLIENT_ID;
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [user, setUser] = useState<UserObject | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setErrorMessage('');
  
    // Validate inputs
    if (!email || !password) {
      setErrorMessage('Please enter your email and password.');
      return;
    }
  
    try {
      const response = await axios.post('http://kafence.vercel.app/user/login', { email, password });
      const data = response.data;
      if (data) {
        console.log("User logged in successfully:", data);
        navigate("/", {state:{user: data}});
      } else {
        setErrorMessage('Invalid email or password.');
      }
    } catch (error: any) {
      console.error("Error during login:", error.message);
      setErrorMessage('Something went wrong. Please try again later.');
    } finally {
      setEmail('');
      setPassword('');
    }
  };
  // const getUser = (user: any) => {
  //   axios
  //     .get('http://kafence.vercel.app/user/getUser', {
  //       params: {
  //         user: user,
  //       },
  //     })
  //     .then((response) => {
  //       console.log(response.data);
  //     })
  //     .catch((error) => {
  //       console.error('Error:', error);
  //     });
  // };

  const onSuccess = async (credentialResponse: CredentialResponse) => {
    if (credentialResponse.credential) {
      const userProfile = parseJwt(credentialResponse.credential);
      if (userProfile) {
        console.log('Login Success: current user:', userProfile);
        const response = await axios.post('http://kafence.vercel.app/user/checkUser', {username: userProfile.given_name, email: userProfile.email});
        if(!response.data.check) {
          await axios.post("http://kafence.vercel.app/user/register", {username: userProfile.given_name, email: userProfile.email, password: userProfile.sub.toString()}); 
          console.log("user has been registered");
        }
        try {
          const email = userProfile.email;
          const password = userProfile.sub;
          const response = await axios.post('http://kafence.vercel.app/user/login', { email, password });
          const data = response.data;
          if (data) {
            console.log("User logged in successfully:", data);
            navigate("/", {state:{user: data}});
          } else {
            setErrorMessage('Invalid email or password.');
          }
        } catch (error: any) {
          console.error("Error during login:", error.message);
          setErrorMessage('Something went wrong. Please try again later.');
        } 
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
      const base64 = decodeURIComponent(
        atob(base64Url)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      return JSON.parse(base64) as any;
    }
    return null;
  };

  // const getUserSubmit = () => {
  //   getUser({ email: email, password: password });
  // };

  return (
    <GoogleOAuthProvider clientId={client_id}>
      <div className="flex flex-col items-center justify-center min-h-screen w-full bg-my-orange">
        <div className="pb-20">
        <Image
        source={require('../../../assets/logo-web-page.png')}
        />
        </div>
        <div className="max-w-md w-full mx-auto p-3 border rounded-lg shadow-md bg-my-black">
          <h2 className="text-3xl font-bold text-center mb-6 text-white font-customFont mt-3">
            Sign In
          </h2>
          {errorMessage && <p className="text-red-500 text-center mb-4">{errorMessage}</p>}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-white" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full border-my-brown rounded-md shadow-sm focus:border-my-brown focus:ring-my-brown p-2"
                required
                placeholder="Enter your email"
              />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-white" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
                required
                placeholder="Enter your password"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-my-brown text-white font-semibold rounded-md hover:bg-my-brown-darker transition font-customFont"
            >
              Submit
            </button>
          </form>

          <div className="flex items-center justify-between mt-5 mb-3">
            <hr className="w-full border-gray-300" />
            <span className="px-2 text-gray-500">or</span>
            <hr className="w-full border-gray-300" />
          </div>

          <div className="flex flex-col items-center justify-center">
            <GoogleLogin
              onSuccess={onSuccess}
              onError={onError}
              theme="filled_black"
              text="continue_with"
              type="standard"
              width={500}
            />
          </div>

          <p className="mt-6 text-center">
            <span className="text-white">Don't have an account?</span>{' '}
            <button
              className="text-my-brown underline font-medium hover:text-my-brown-darker"
              onClick={() => navigate("../register")}
            >
              Register
            </button>
          </p>

          {user && (
            <div className="mt-6 text-white">
              <img src={user.picture} alt={user.name} className="rounded-full mt-2" />
            </div>
          )}
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default LogIn;
