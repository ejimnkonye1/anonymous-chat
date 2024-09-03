/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

export const Chatbox = () => {
    const [message, setmessage] = useState('')
    const [messages, setMessages] = useState([])
   const user = useSelector((state) => state.username)
const handleSendMessage =async (e) => {
    e.preventDefault()
    if(message.trim() == ''){
        return
    }
    if (user){
      try{
        const response = await fetch('http://localhost:5000/sendmessage',{
            method:'POST',
            headers:{
                'Content-type':'application/json'
            },
            body: JSON.stringify({
                message: message,
                sender_username: user.username
            }),
        })
      const data = await response.json()
      if(response.ok){
        console.log('sent', data)
        setmessage('')
      }else{
        console.error('failed', data)
      }
    }catch(err){
       console.error(err)
    }

    }

}
const handleFecthmessage = async (e) => {
  
  
  if (user){
    try {
      const response = await fetch(`http://localhost:5000/fetchmessages?senderId=billie`,{
        method:'GET',
        headers:{
          'Content-type': 'application/json'
        },

  
      })
      const data = await response.json()
      if(response.ok){
        console.log('message :', data)
        setMessages(data.message)
      }else{
        console.log('error:', data)
      }
    }catch(err){
      console.error(err)
    }
  }

}

useEffect(()=> {
handleFecthmessage()
},[user])
    return(
        <div className="flex justify-center h-screen overflow-y-hidden min-h-screen">
        <div className="max-w-lg w-full p-4 rounded-lg shadow-lg bg-white">
          <div className="bg-gray-200 py-4 px-6 flex justify-between items-center">
            <h2 className="text-lg font-bold">Chat</h2>
            {user ?<p>logged in as {user.username}</p>: <p>User</p>}
          </div>
      
          <div className="flex-1 overflow-y-auto p-6 billie">
            <div className="mb-4">
              <div className="bg-gray-200 p-4 rounded-lg">
                <p className="text-gray-600">Received message</p>
              </div>
              <span className="text-gray-500 text-xs">10:00 AM</span>
            </div>
      
            <div className="mb-4">
              <div className="bg-blue-200 p-4 rounded-lg">
                <p className="text-gray-600">Sent message</p>
                {messages.length > 0 ? (
                messages.map((msg, index) => {
              return(
                <ul key={index}>
                <li >
                {msg.messages}
                </li>
              </ul>
              );
                })
              ) : (
                <p>no message</p>
              
               )}


              </div>
              <span className="text-gray-500 text-xs">10:05 AM</span>
            </div>
          </div>
      
          <form className="bg-gray-200 py-4 px-6 flex justify-between items-center" onSubmit={handleSendMessage}>
            <input type="text" className="w-full py-2 px-4 rounded-lg"
            onChange={(e) => setmessage(e.target.value)}
            value={message}
            placeholder="Type a message..." />
            <button type="submit"   className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg">Send</button>
          </form>
        </div>
      </div>
    )
}