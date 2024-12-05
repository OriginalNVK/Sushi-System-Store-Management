const LoginForm = () => {
  return (
      <div className="flex-1 px-6 py-8">
          <h2 className="text-center text-2xl font-bold mb-6">Login Your Account</h2>
          <form className="space-y-4">
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
            <button
              type="submit"
              className="w-full p-3 bg-yellow-500 text-white rounded font-bold hover:bg-yellow-600 transition"
            >
              Login
            </button>
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