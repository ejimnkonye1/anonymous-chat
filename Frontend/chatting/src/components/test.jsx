import React, { useEffect, useState } from 'react';
import socketIOClient from 'socket.io-client';
import { useSelector } from "react-redux";

export const Test = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const socket = socketIOClient('https://chat-api-kbqm.onrender.com', {
    transports: ['websocket', 'polling']
  });
  const user = useSelector((state) => state.username); // Adjust according to your Redux state

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected to server');
    });

    // Listen for incoming messages
    socket.on('message', (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    // Fetch messages when the component mounts
    const fetchMessages = () => {
      socket.emit('fetchmessages', { senderId: user.username });
    };

    fetchMessages(); // Fetch messages on mount

    // Listen for fetched messages
    socket.on('fetchMessagesResponse', (data) => {
      if (data.error) {
        console.error(data.error);
      } else {
        setMessages(data.message);
        console.log('msg', data.message)
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [socket, user.username]);

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

  return (
    <div className="App">
      <h1>Socket.IO Chat Application</h1>
      <div>
        <strong>Logged in as:</strong> {user.username}
      </div>
      <div className="mb-4">
  {messages.length > 0 ? (
    messages.map((msg, index) => {
      const isCurrentUser = msg.sender_username === user.username;
      return (
        <ul key={index} className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'} mb-4`}>
          <li className={`${isCurrentUser ? 'sent bg-blue-200' : 'bg-gray-200'} p-4 rounded-lg text-gray-600 mb-4`}>
            {msg.messages}<br />

          </li>
        </ul>
      );
    })
  ) : (
    <p className="text-center text-bold">No messages</p>
  )}
</div>
      <form onSubmit={handleSendMessage}>
        <input
          type="text"
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};
