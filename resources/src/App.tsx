import React, { useEffect, useRef, useState } from 'react';
import { Button, Container, Nav, Navbar, NavDropdown, Stack } from 'react-bootstrap';
import reactLogo from './assets/react.svg';
import './App.css';

const App: React.FC = () => {
    return (
        <>
            <Navbar bg="light" expand="lg">
                <Container>
                    {/* <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand> */}
                    <Navbar.Brand href="/" className="text-info">
                        <img
                            alt="reactLogo"
                            src={reactLogo}
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                        />
                        React Bootstrap
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="#">Home</Nav.Link>
                            <Nav.Link href="#">Link</Nav.Link>
                            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                                <NavDropdown.Item href="#">Action</NavDropdown.Item>
                                <NavDropdown.Item href="#">Another action</NavDropdown.Item>
                                <NavDropdown.Item href="#">Something</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#">Separated link</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
};

export default App;
