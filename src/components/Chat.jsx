import React, { useEffect, useState, useRef } from 'react';
import { useParams} from 'react-router-dom';
import './chat.css';
import { io } from 'socket.io-client';

const socket = io(
  Math.random() < 0.5
    ? 'https://server2-pjt4.onrender.com'
    : 'https://mensajeria-wty4.onrender.com',
  {
    transports: ['websocket'],
  }
);

const Chat = () => {
  const { roomId } = useParams(); // <--- obtienes la sala desde la URL
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const name = prompt('Ingresa tu nombre:') || 'Anónimo';
    setUsername(name);

    socket.emit('joinRoom', roomId); // <--- unirse a la sala
    socket.on('mensaje', (msgObj) => {
      setMessages((prev) => [...prev, msgObj]);
    });

    return () => {
      socket.emit('leaveRoom', roomId); // <--- salir de la sala si se desmonta
      socket.off('mensaje');
    };
  }, [roomId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = () => {
    if (message.trim() !== '') {
      socket.emit('mensaje', {
        user: username,
        text: message,
        room: roomId, 
      });
      setMessage('');
    }
  };

  return (
    <div className="chat-wrapper">
      <div className="chat-container">
        <h3>Chat - Sala: {roomId}</h3>
        <div className="chat-messages">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`message-row ${msg.user === username ? 'right' : 'left'}`}
            >
              <div
                className={`message-bubble ${msg.user === username ? 'right' : 'left'}`}
              >
                <strong>{msg.user === username ? 'Yo' : msg.user}:</strong> {msg.text}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div className="chat-input-container">
          <input
            type="text"
            placeholder="Escribe un mensaje..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            className="chat-input"
          />
          <button onClick={sendMessage} className="chat-button">
            Enviar &#10148;
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
