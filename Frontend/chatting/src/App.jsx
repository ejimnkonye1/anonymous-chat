
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import { Loginpage } from './components/login'
import { Registerpage } from './components/signup'
import { Chatbox } from './components/chatbox'
import { Test } from './components/test'

function App() {


  return (
   <div className=' min-h-screen  '>
    <Router>
      <Routes>
        <Route path='/' element={<Loginpage />} />
        <Route path='/register' element={<Registerpage />} />
        <Route path='/chat' element={<Chatbox />} />
        <Route path='/test' element={<Test />} />
      </Routes>
    </Router>
  

   </div>
  )
}

export default App
