import React from 'react';

import { Container, Navbar, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

export const Topbar = ({style, headers, title}) => {
    return (
        <>
        <Navbar bg={style} expand="lg" variant={style}>
            <Container>
                <Navbar.Brand>{title}</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    { headers.map((head, h) =>
                        <LinkContainer to={head.to}>
                            <Nav.Link disabled={head.disabled ? true : false}>{head.label}</Nav.Link>
                        </LinkContainer>
                    )}
                </Nav>
        </Navbar.Collapse>
            </Container>
        </Navbar>
        </>
    )
}