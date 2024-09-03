/* eslint-disable no-unused-vars */
import { useState } from "react"
import { useSelector } from "react-redux"

export const Chatbox = () => {
    const [message, setmessage] = useState('')
    const [senderId, setSenderId] = useState('')
   const user = useSelector((state) => state.username)
const handleSendMessage =async (e) => {
    e.preventDefault()
    if(message.trim() == ''){
        return
    }
    try{
        const response = await fetch('http://localhost:5000/sendmessage',{
            method:'POST',
            headers:{
                'Content-type':'application/json'
            },
            body: JSON.stringify({
                message: message,
                senderId: ''
            })
        })
      const data = await response.json()
      if(response.ok){
        console.log('sent', data)
      }else{
        console.log('failed', data)
      }
    }catch(err){
       console.log(err)
    }


}
    return(
        <div className="flex justify-center h-screen overflow-y-hidden min-h-screen">
        <div className="max-w-lg w-full p-4 rounded-lg shadow-lg bg-white">
          <div className="bg-gray-200 py-4 px-6 flex justify-between items-center">
            <h2 className="text-lg font-bold">Chat</h2>
            {user && <p>logged in as {user.username}</p>}
          </div>
      
          <div className="flex-1 overflow-y-auto p-6">
            <div className="mb-4">
              <div className="bg-gray-200 p-4 rounded-lg">
                <p className="text-gray-600">Received message</p>
              </div>
              <span className="text-gray-500 text-xs">10:00 AM</span>
            </div>
      
            <div className="mb-4">
              <div className="bg-blue-200 p-4 rounded-lg">
                <p className="text-gray-600">Sent message</p>{message}
              </div>
              <span className="text-gray-500 text-xs">10:05 AM</span>
            </div>
          </div>
      
          <div className="bg-gray-200 py-4 px-6 flex justify-between items-center">
            <input type="text" className="w-full py-2 px-4 rounded-lg"
            onChange={(e) => setmessage(e.target.value)}
            onClick={handleSendMessage}
            placeholder="Type a message..." />
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg">Send</button>
          </div>
        </div>
      </div>
    )
}