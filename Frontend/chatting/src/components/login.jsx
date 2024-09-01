export const Loginpage = () => {
    return(
        <div className="min-h-screen flex items-center justify-center bg-blue-700">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
          <h1 className="text-2xl font-bold text-center mb-6">Login</h1>
          <div className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-start text-gray-700">Username</label>
              <input 
                type="text" 
                name="username" 
                className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                placeholder="Enter your username"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-start text-gray-700">Password</label>
              <input 
                type="password" 
                name="password" 
                className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                placeholder="Enter your password"
              />
            </div>
          </div>
          <button className="w-full bg-blue-500 text-white font-bold py-2 px-4 mt-6 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
            Login
          </button>
        </div>
      </div>
      

    )
}