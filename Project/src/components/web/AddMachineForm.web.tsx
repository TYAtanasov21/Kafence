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
  
  const [submitted, setSubmitted] = useState(false); // Track submission status
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    fetch('https://formspree.io/f/mwpklgkq', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then(response => {
        if (response.ok) {
          setSubmitted(true);
          setFormData({ address: '', brand: '', name: '', email: '' });
        } else {
          alert('There was an issue sending your message. Please try again.');
        }
      })
      .catch(() => alert('There was an error sending the email.'));
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto p-7 bg-white rounded-lg">
      <h1 className="text-center items-center mb-4 font-bold text-xl">Направи добро, добави машина</h1>

      {submitted && <p className="text-green-500 text-center mb-4">Запитването изпратено успешно!</p>}
      
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
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
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="brand">
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
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
          Име на подателя
        </label>
        <input
          className="bg-my-beige appearance-none rounded w-full py-3 px-4 text-gray-800 text-lg leading-tight focus:outline-none h-12"
          id="name"
          type="text"
          name="name"
          placeholder="Напишете вашето име"
          value={formData.name}
          onChange={handleChange}
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
          Email на подателя
        </label>
        <input
          className="bg-my-beige appearance-none rounded w-full py-3 px-4 text-gray-800 text-lg leading-tight focus:outline-none h-12"
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
          className="w-full bg-my-purple hover:bg-my-purple-darker text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline h-12"
        >
          Изпращане на запитване
        </button>
      </div>
    </form>
  );
};

export default AddMachineForm;
