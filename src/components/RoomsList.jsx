import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import RoomItem from './RoomItem';
import './roomList.css';
import { io } from 'socket.io-client';

const socket = io('https://mensajeria-wty4.onrender.com', {
  transports: ['websocket'],
});

const RoomsList = () => {
  const [rooms, setRooms] = useState([]);
  const [unreadRooms, setUnreadRooms] = useState(new Set());
  const navigate = useNavigate();
  const location = useLocation();

  const currentRoomCode = location.pathname.startsWith('/chat/')
    ? location.pathname.split('/chat/')[1]
    : null;

  const fetchRooms = async () => {
    try {
      const res = await fetch('https://mensajeria-wty4.onrender.com/rooms');
      const data = await res.json();
      setRooms(data);
    } catch (err) {
      console.error('Error al cargar salas:', err);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  useEffect(() => {
    socket.on('mensaje', (msg) => {
      if (msg.room !== currentRoomCode) {
        setUnreadRooms((prev) => new Set(prev).add(msg.room));
      }
    });

    return () => {
      socket.off('mensaje');
    };
  }, [currentRoomCode]);

  useEffect(() => {
    if (currentRoomCode) {
      setUnreadRooms((prev) => {
        const updated = new Set(prev);
        updated.delete(currentRoomCode);
        return updated;
      });
    }
  }, [currentRoomCode]);

  const handleJoinRoom = () => {
    const roomCode = prompt('Ingrese el código de la sala:');
    if (roomCode && roomCode.trim()) {
      navigate(`/chat/${roomCode.trim()}`);
    }
  };

  const handleCreateRoom = async () => {
    const roomName = prompt('Ingrese el nombre de la nueva sala:');
    if (!roomName || !roomName.trim()) return;

    try {
      const res = await fetch('https://mensajeria-wty4.onrender.com/rooms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: roomName.trim(),
          createdBy: '663fb8d9ab1234567890abcd', // ← reemplazar con ID usuario
        }),
      });

      if (res.ok) {
        fetchRooms(); // Actualiza lista
      } else {
        alert('Error al crear la sala');
      }
    } catch (err) {
      console.error('Error al enviar solicitud:', err);
      alert('Ocurrió un error al crear la sala');
    }
  };

  return (
    <div className="rooms-container">
      <h2 className="rooms-tittle" >Salas Disponibles</h2>

      <div className="room-buttons">
        <button onClick={handleJoinRoom}>🔍 Unirse a una sala</button>
        <button onClick={handleCreateRoom}>➕ Crear nueva sala</button>
      </div>

      <ul className="rooms-list">
        {rooms.map((room) => (
          <RoomItem
            key={room._id}
            room={room}
            hasUnread={unreadRooms.has(room.code)}
          />
        ))}
      </ul>
    </div>
  );
};

export default RoomsList;
