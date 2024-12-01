import React from 'react';
import Header from '../components/Header';
import sushiImage from '../assets/content/homeClient/sushi-image-login.png';
import RegisterForm from '../components/RegisterForm';
const RegisterPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <Header />

      <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg max-w-4xl p-6">
        <div className="flex-1 flex items-center justify-center">
          <img
            src={sushiImage}
            alt="Sushi"
            className="max-w-full h-auto"
          />
        </div>

        <RegisterForm />
      </div>
    </div>
  );
};

export default RegisterPage;
