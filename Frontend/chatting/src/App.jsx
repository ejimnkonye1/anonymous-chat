
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import { Loginpage } from './components/login'
import { Registerpage } from './components/signup'
import { Chatbox } from './components/chatbox'

function App() {


  return (
   <div className='w-full min-h-screen bg-blue-700 '>
    <Router>
      <Routes>
        <Route path='/' element={<Loginpage />} />
        <Route path='/register' element={<Registerpage />} />
        <Route path='/chat' element={<Chatbox />} />
      </Routes>
    </Router>
  

   </div>
  )
}

export default App
