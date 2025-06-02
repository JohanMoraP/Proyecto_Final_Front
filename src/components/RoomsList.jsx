import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './roomList.css';

const RoomsList = () => {
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate();

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
          createdBy: '663fb8d9ab1234567890abcd', // ← reemplazar con el ID de usuario real
        }),
      });

      if (res.ok) {
        fetchRooms(); // actualiza la lista
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
      <h2>Salas Disponibles</h2>

      <div className="room-buttons">
        <button onClick={handleJoinRoom}>🔍 Unirse a una sala</button>
        <button onClick={handleCreateRoom}>➕ Crear nueva sala</button>
      </div>

      <ul className="rooms-list">
        {rooms.map((room) => (
          <li key={room._id} className="room-item">
            <Link to={`/chat/${room.code}`} className="room-link">
              {room.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RoomsList;
