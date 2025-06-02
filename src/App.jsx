import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Chat from './components/Chat';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import RoomsList from './components/RoomsList';
import './App.css';

function App() {
  return (
    <div className='app_div'>
      <Router>
        <nav>
          <Navbar />
        </nav>

        <div className='chatFrame'>
          <Routes>
            <Route path="/" element={<RoomsList />} />
            <Route path="/chat/:roomId" element={<Chat />} />
          </Routes>
        </div>

        <footer>
          <Footer />
        </footer>
      </Router>
    </div>
  );
}

export default App;
