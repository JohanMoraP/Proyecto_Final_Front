import { Link } from 'react-router-dom';
import './roomItem.css';

const RoomItem = ({ room , hasUnread }) => {
  return (
    <li className="room-item">
      <Link to={`/chat/${room.code}`} className="room-link">
        {room.name}
        {hasUnread && <span className="unread-dot" />}
      </Link>
    </li>
  );
};

export default RoomItem;
