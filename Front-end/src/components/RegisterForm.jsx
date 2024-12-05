import React from 'react'

const RegisterForm = () => {
  return (
      <div className="flex-1 px-6 py-8">
          <h2 className="text-center text-2xl font-bold mb-6">Create Your Account</h2>
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Enter your Full Name here"
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
            <input
              type="email"
              placeholder="Enter your Email here"
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
            <input
              type="password"
              placeholder="Enter your Password here"
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
            <input
              type="password"
              placeholder="Confirm your Password here"
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
            <input
              type="text"
              placeholder="Enter your Identity Card number"
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
            <input
              type="tel"
              placeholder="Enter your Phone number"
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
            <select className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500">
              <option>Gender</option>
              <option>Male</option>
              <option>Female</option>
            </select>
            <button
              type="submit"
              className="w-full p-3 bg-yellow-500 text-white rounded font-bold hover:bg-yellow-600 transition"
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