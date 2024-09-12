/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import socketIOClient from 'socket.io-client';

export const Chatbox = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const socket = socketIOClient('http://localhost:5000', {
    transports: ['websocket', 'polling']
  });
  const user = useSelector((state) => state.username); // Adjust according to your Redux state



  useEffect(() => {
    // Handle socket connection
    socket.on('connect', () => {
      console.log('Connected to server');
    });

    // Listen for incoming messages
    socket.on('message', (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    // Fetch messages when the component mounts
    const fetchMessages = () => {
      if (user.username) {
        socket.emit('fetchmessages', { senderId: user.username });
      }
    };

    fetchMessages(); // Fetch messages on mount

    // Listen for fetched messages
    socket.on('fetchMessagesResponse', (data) => {
      if (data.error) {
        console.error(data.error);
      } else {
        setMessages(data.message);
        console.log('Fetched messages:', data.message);
      }
    });

    // Cleanup socket on component unmount
    return () => {
      socket.off('message');
      socket.off('fetchMessagesResponse');
    };
  }, [socket,user.username]); // Run the effect only when user.username changes
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      const newMessage = {
        sender_username: user.username,
        message,
        timestamp: new Date().toISOString(),
      };

      // Immediately update the messages state with the new message
      setMessages((prevMessages) => [...prevMessages, newMessage]);

      // Send the message to the server
      socket.emit('message', newMessage);
      setMessage('');
    }
  };
  const formatTime = (timestamp) => {
    const time = new Date(timestamp);
    return time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="flex justify-center h-screen overflow-y-hidden min-h-screen p-4">
      <div className="max-w-lg w-full p-4 rounded-lg shadow-lg bg-white h-full flex flex-col">
        <div className="border-b py-4 px-6 flex justify-between items-center">
          <h2 className="text-lg font-bold">Chat</h2>
          {user ? <p>Logged in as {user.username}</p> : <p>User</p>}
        </div>

        <div className="flex-1 overflow-y-auto p-6 billie">

<div className="mb-4">
 
  
    { messages.length > 0 ? (
    messages.filter((msg,index, self)=>
    index === self.findIndex((m) => m.messages === msg.messages && m.senderId === msg.senderId)
    )
    
    .map((msg, index) => {
      const isCurrentUser = msg.senderId === user.user_id;
      console.log(isCurrentUser)
      
  return(
    <ul key={index} className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'} mb-4`}>
    <li className={`${isCurrentUser ? 'flex-end sent bg-blue-200 p-4 rounded-lg text-gray-600 mb-4': 'bg-gray-200 p-4 rounded-lg text-gray-600 mb-4'} ` }>
     {msg.messages}<br/>
     <span className="text-gray-500 text-xs">{formatTime(msg.timestamp)}</span>
    </li>
  </ul>
  );
    })
  ) : (
    <p className="text-center text-bold">no message</p>
  
   )}


  </div>


</div>


        <div className="py-4 px-2">
          <form onSubmit={handleSendMessage} className="flex justify-between items-center">
            <input 
              type="text" 
              className="w-full py-2 px-4 rounded-lg bg-gray-200 border border-gray-400 focus:outline-none focus:ring focus:border-blue-500"
              onChange={(e) => setMessage(e.target.value)}
              value={message}
              placeholder="Type a message..." 
            />
            <button type="submit" className="ml-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg">Send</button>
          </form>
        </div>
      </div>
    </div>
  );
};
