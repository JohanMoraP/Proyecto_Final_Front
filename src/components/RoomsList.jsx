import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './roomList.css';

const RoomsList = () => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await fetch('https://mensajeria-wty4.onrender.com/rooms');
        const data = await res.json();
        console.log("Salas obtenidas:", data);
        setRooms(data);
      } catch (err) {
        console.error('Error al cargar salas:', err);
      }
    };

    fetchRooms();
  }, []);

  return (
    <div className="rooms-container">
      <h2>Salas Disponibles</h2>
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
