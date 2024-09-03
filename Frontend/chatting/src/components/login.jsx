import { useState } from "react"
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../action";
export const Loginpage = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const Login = async (e) => {
    e.preventDefault();
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
      const data = await response.json()
      if(response.ok){
        console.log('user found logging in', data)
        dispatch(setUser(data))
        navigate('/chat')
      }else{
        console.log('user not found logging failed', data)
      }
    }catch(err){
      console.log(err)
    }
  }
    return(
        <div className="min-h-screen flex items-center justify-center bg-blue-700">
          <form onSubmit={Login} className="max-w-sm w-full">
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
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-start text-gray-700">Password</label>
              <input 
                type="password" 
                name="password" 
                className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white font-bold py-2 px-4 mt-6 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
            Login
          </button>
        </div>
        </form>
      </div>
      

    )
}