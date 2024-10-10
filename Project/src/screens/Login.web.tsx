import React, { useState } from 'react';

import { FaGoogle } from 'react-icons/fa';
import { FaMicrosoft } from 'react-icons/fa';
import { FaApple } from 'react-icons/fa'; 

const LogIn: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setErrorMessage('');

    // Basic validation
    if (!email || !password) {
      setErrorMessage('Please enter your email and password.');
      return;
    }

    // Simulate an API call for sign-in
    console.log('Email:', email);
    console.log('Password:', password);

    // Reset form fields
    setEmail('');
    setPassword('');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full bg-my-orange">
      <div className = "pb-20">
        <img src = "../../assets/logo-web-page.png"></img>
      </div>
      <div className="max-w-md w-full mx-auto p-3 border rounded-lg shadow-md bg-my-black">
        <h2 className="text-3xl font-bold text-center mb-6 text-white font-customFont mt-3">Sign In</h2>
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
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
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
            className="w-full py-2 px-4 bg-my-purple text-white font-semibold rounded-md hover:bg-blue-700 transition font-customFont"
          >
            Sign In
          </button>
        </form>

        <div className="flex items-center justify-between my-6">
          <hr className="w-full border-gray-300" />
          <span className="px-2 text-gray-500">or</span>
          <hr className="w-full border-gray-300" />
        </div>

        <div className="grid grid-cols-1 gap-4">
          <button
            onClick={() => console.log('Signing in with Google...')}
            className="flex items-start justify-start w-full bg-white text-black font-semibold rounded-md hover:bg-rose-500 transition py-2 text-xl font-customFont"
          >
            <FaGoogle size = '25' className = "mr-2 ml-3"/>
            Continue with Google
          </button>
          <button
            onClick={() => console.log('Signing in with Microsoft...')}
            className="flex items-start justify-start w-full bg-white text-black font-semibold rounded-md hover:bg-blue-500 transition py-2 text-xl font-customFont"
          >
            <FaMicrosoft size = '25' className = "mr-2 ml-3"/>
            Continue with Microsoft
          </button>
          <button
            onClick={() => console.log('Signing in with Apple...')}
            className="flex items-start justify-start w-full bg-white text-black font-semibold rounded-md hover:bg-gray-600 transition py-2 text-xl font-customFont"
          >
            <FaApple size = '25' className = "mr-2 ml-3"/>
            Continue with Apple
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
