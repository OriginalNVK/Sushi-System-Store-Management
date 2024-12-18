import { useState } from "react"
import { loginUser } from "../service/Services"
import {useNavigate} from 'react-router-dom'

const LoginForm = () => {

  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false);

  const Navigate = useNavigate();

  const handleLoginSuccess = (role) => {
    localStorage.setItem('user', JSON.stringify({ isLogged: true, role: role }));
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true);
    setError('')

    const result = await loginUser(phone, password);

    if (result.success)
    {
      handleLoginSuccess(result.role);
      console.log("Login successful");
      if (result.role === 'customer')
      {
        Navigate('/');
      }
      else if (result.role === 'manager branch')
      {
        Navigate('/customer');
      }
    }
    else {
      setError(result.error);
    }
    setLoading(false);
  }


  return (
      <div className="flex-1 px-6 py-8">
          <h2 className="text-center text-2xl font-bold mb-6">Login Your Account</h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              type="tel"
              placeholder="Enter your phone number here"
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
            />
            <input
              type="password"
              placeholder="Enter your Password here"
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="submit"
              className="w-full p-3 bg-yellow text-white rounded font-bold hover:opacity-90 transition"
              disabled={loading}
            >
              {loading? "Loading...": "Login"}
        </button>
        {error && <p className="text-red-500 text-center">{error}</p>}
          </form>
          <div className="text-center mt-4">
            <p>
              Don’t have an account?{' '}
              <a href="/register" className="text-yellow-500 font-bold">
                Create Account
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

export default LoginForm