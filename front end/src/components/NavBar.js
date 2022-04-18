import React from 'react'
import { Container, Nav, Offcanvas } from 'react-bootstrap'
import Navbar from 'react-bootstrap/Navbar'

const NavBar = () => {
    return (
        <Navbar bg="dark" variant="dark" expand={false}>
            <Container fluid>
                <Navbar.Toggle aria-controls="offcanvasNavbar" />
                <Navbar.Brand to="/">Semillero S.A.S</Navbar.Brand>
                <Navbar.Offcanvas
                    id="offcanvasNavbar"
                    aria-labelledby="offcanvasNavbarLabel"
                >
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title id="offcanvasNavbarLabel">Opciones</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <Nav className="justify-content-end flex-grow-1 pe-3">
                            <Nav.Link href="/">Inicio</Nav.Link>
                            <Nav.Link href="/ctrVehiculo">Control Vehiculos</Nav.Link>
                            <Nav.Link href="/ctrMarca">Control Marcas</Nav.Link>
                            <Nav.Link href="/ctrLinea">Control Lineas</Nav.Link>
                        </Nav>
                    </Offcanvas.Body>
                </Navbar.Offcanvas>
            </Container>
        </Navbar>
    )
}

export default NavBar