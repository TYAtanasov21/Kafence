import React, { useState } from 'react';

interface FormData {
  address: string;
  brand: string;
  name: string;
  email: string;
}

const AddMachineForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    address: '',
    brand: '',
    name: '',
    email: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto p-7 bg-white rounded-lg">
      <h1 className="text-center items-center mb-4 font-bold text-xl">Направи добро, добави машина</h1>
      
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
          Подробен адрес
        </label>
        <input
          className="bg-my-beige appearance-none rounded w-full py-3 px-4 text-gray-800 text-lg leading-tight focus:outline-none h-12"
          id="address"
          type="text"
          name="address"
          placeholder="Напишете подробен адрес на машината"
          value={formData.address}
          onChange={handleChange}
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
          Марка на машината
        </label>
        <input
          className="bg-my-beige appearance-none rounded w-full py-3 px-4 text-gray-800 text-lg leading-tight focus:outline-none h-12"
          id="brand"
          type="text"
          name="brand"
          placeholder="Напишете марката на машината"
          value={formData.brand}
          onChange={handleChange}
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
          Име на подателя
        </label>
        <input
          className="bg-my-beige appearance-none rounded w-full py-3 px-4 text-gray-800 text-lg leading-tight focus:outline-none h-12"
          id="name"
          type="name"
          name="name"
          placeholder="Напишете вашето име"
          value={formData.name}
          onChange={handleChange}
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
          Email на подателя
        </label>
        <input
          className=" bg-my-beige appearance-none rounded w-full py-3 px-4 text-gray-800 text-lg leading-tight focus:outline-none h-12"
          id="email"
          type="email"
          name="email"
          placeholder="Напишете вашият email"
          value={formData.email}
          onChange={handleChange}
        />
      </div>

      <div>
        <button
          type="submit"
          className="w-full bg-my-purple hover:bg-my-purple text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline h-12"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default AddMachineForm;
