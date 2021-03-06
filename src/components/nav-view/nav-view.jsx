import React from "react";

import './nav-view.scss'
import { Navbar, Container, Nav, Button, Form } from 'react-bootstrap';


export function NavView({ user }) {

    return (
        <Container id="navbar-container">
            <Navbar id="navbar" fixed="top" className='nav-bar'>

                <Navbar.Brand id="navbar-brand" href="/">Movie Base</Navbar.Brand>
                <Nav id="nav" className="me-auto">
                    <Nav.Link id="nav-link" href="/profile">Profile</Nav.Link>
                    <Nav.Link id="nav-link" href="#">Watchlist</Nav.Link>          </Nav>
            </Navbar>
        </Container>


    )
}