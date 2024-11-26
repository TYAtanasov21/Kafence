import React, { useState } from 'react';

const Register: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setErrorMessage('');

    // Basic validation
    if (!name || !email || !password) {
      setErrorMessage('All fields are required.');
      return;
    }

    // Simulate an API call for registration
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Password:', password);

    // Reset form fields
    setName('');
    setEmail('');
    setPassword('');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full bg-my-orange">
      <div className="pb-10">
        <img src="../../assets/logo-web-page.png" alt="logo" />
      </div>
      <div className="max-w-md w-full mx-auto p-5 border rounded-lg shadow-md bg-my-black">
        <h2 className="text-3xl font-bold text-center mb-6 text-white font-customFont">Register</h2>
        {errorMessage && <p className="text-red-500 text-center mb-4">{errorMessage}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-white" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full border-my-brown rounded-md shadow-sm focus:border-my-brown focus:ring-my-brown p-2"
              required
              placeholder="Enter your name"
            />
          </div>
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
              className="mt-1 block w-full border-my-brown rounded-md shadow-sm focus:border-my-brown focus:ring-my-brown p-2"
              required
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-my-brown text-white font-semibold rounded-md hover:bg-my-brown-darker transition font-customFont"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
