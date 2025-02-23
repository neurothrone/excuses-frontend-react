import React from "react";
import {Navbar, Nav, Container} from "react-bootstrap";
import {Link} from "react-router";

const Navigation: React.FC = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="sm">
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold text-glow">Excuses API</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarNav"/>
        <Navbar.Collapse id="navbarNav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/" className="text-glow">All Excuses</Nav.Link>
            <Nav.Link as={Link} to="/add" className="text-glow">Add Excuse</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
