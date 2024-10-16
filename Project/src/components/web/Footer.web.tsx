import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-my-brown w-full text-center py-2">
      <h2 className="font-bold text-xl text-white">Кафенце</h2>
      <h2 className="font-semibold text-l mb-2 text-white">Вашият партньор в света на кафето.</h2>
      <p className="text-white text-lg">📞 Телефон: +359 888 123 456</p>
      <p className="text-white text-lg">📧 Email: info@kafence.com</p>
      <p className="text-white text-sm mt-2">© 2024 Кафенце. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
