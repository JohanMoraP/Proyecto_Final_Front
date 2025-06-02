import React from 'react';
import { Navbar, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './Navbar.css'; // Nuevo archivo CSS

function MyNavbar() {
  const navigate = useNavigate();

  return (
    <Navbar bg="dark" variant="dark">
      <Container className="d-flex justify-content-between align-items-center">
        <Navbar.Brand href="#">Chat con amigos</Navbar.Brand>

        <button
          onClick={() => navigate('/')}
          className="home-button"
        >
          ←🏠
        </button>
      </Container>
    </Navbar>
  );
}

export default MyNavbar;
