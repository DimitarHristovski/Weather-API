import React from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export function Navigate() {
  return (
    <div className="Navigate">
      <Navbar bg="primary" variant="dark">
        <Container>
          <Navbar.Brand href="/home">WeatherAPI</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/SearchCities">Search</Nav.Link>
            <Nav.Link href="/LocalCities">Local</Nav.Link>
            <Nav.Link href="/EuropeanCities">Europe</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
}
