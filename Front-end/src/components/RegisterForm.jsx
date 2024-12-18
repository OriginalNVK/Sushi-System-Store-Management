import React, { useState } from 'react';

const RegisterForm = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [cccd, setCccd] = useState('');
  const [phone, setPhone] = useState(''); // Corrected initialization
  const [gender, setGender] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ fullName, email, password, confirmPassword });
  }

  return (
      <div className="flex-1 px-6 py-8">
          <h2 className="text-center text-2xl font-bold mb-6">Create Your Account</h2>
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Enter your Full Name here"
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Enter your Email here"
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Enter your Password here"
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="Confirm your Password here"
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <input
              type="text"
              placeholder="Enter your Identity Card number"
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
              value={cccd}
              onChange={(e) => setCccd(e.target.value)}
            />
            <input
              type="tel"
              placeholder="Enter your Phone number"
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <select className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
                value={gender} onChange={(e) => setGender(e.target.value)}>
              <option>Gender</option>
              <option>Male</option>
              <option>Female</option>
            </select>
            <button
              type="submit"
              className="w-full p-3 bg-yellow text-white rounded font-bold hover:opacity-90 transition"
              onClick={handleSubmit}
            >
              Create Account
            </button>
          </form>
          <div className="text-center mt-4">
            <p>
              Already have an account?{' '}
              <a href="/login" className="text-yellow-500 font-bold">
                Login
              </a>
            </p>
            <p className="text-gray-500 my-2">- OR -</p>
            <div className="flex justify-center gap-4">
              <button className="p-2 bg-gray-100 border rounded">Google</button>
              <button className="p-2 bg-gray-100 border rounded">Facebook</button>
            </div>
          </div>
        </div>
  )
}

export default RegisterForm