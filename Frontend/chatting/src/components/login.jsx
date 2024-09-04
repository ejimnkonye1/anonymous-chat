import { useState } from "react"
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../action";
export const Loginpage = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setloading] = useState('')
  const [error, setError] = useState(null)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const Login = async (e) => {
    e.preventDefault();
    setloading(true); 
    try{
      const response = await fetch('http://localhost:5000/login',{
        method:"POST",
        headers:{
          'Content-type':'application/json'
        },
        body: JSON.stringify({
          username: username,
          password:password
        }),
      })
      setloading(true)
      const data = await response.json()
      if(response.ok){
        setloading(true)
        console.log('user found logging in', data)
        dispatch(setUser(data))
        setloading(false); 
        navigate('/chat')
      }else{
        console.log('user not found logging failed', data)
        setloading(false); 
        setError(data)
        setTimeout(() => {
       setError(false)
        }, 4000);
      }
    }catch(err){
      setloading(false); 
      console.log(err)
      setError(err.message)
      setTimeout(() => {
     setError(false)
      }, 4000);
    }
  }

    return(
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form onSubmit={Login} className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Login</h1>
        {error && (
          <p className="mb-4 p-4 border border-red-500 text-red-500 text-center rounded-lg bg-red-100">
            {error}
          </p>
        )}
        <div className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-gray-700">Username</label>
            <input 
              type="text" 
              name="username" 
              className="w-full px-4 py-3 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
              placeholder="Enter your username"
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-gray-700">Password</label>
            <input 
              type="password" 
              name="password" 
              className="w-full px-4 py-3 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>
        <button 
  type="submit" 
  className="w-full bg-blue-500 text-white font-bold py-3 px-4 mt-8 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 flex items-center justify-center"
>
  {loading ? (
    <>
      <svg className="animate-spin h-5 w-5 mr-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
      </svg>
      Logging in...
    </>
  ) : (
    'Login'
  )}
</button>

      </form>
    </div>
    
    
    
      

    )
}