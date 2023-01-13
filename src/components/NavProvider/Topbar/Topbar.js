import React from 'react';

import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';
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
                        <>
                        { head?.dropdown ? (
                            <NavDropdown
                                title={head.label}
                                menuVariant={style}
                            >
                                { head.dropdown.map((drop, d) =>
                                    <>
                                    {drop.label == "divider" && !drop?.hidden ? (
                                        <NavDropdown.Divider />
                                    ) : (
                                        <>
                                        {!drop?.hidden ? (
                                            <>
                                            {drop.execute ? (
                                                <a className={`dropdown-item function-link ${drop?.disabled ? 'disabled' : ''}`}>
                                                    {drop.label}
                                                </a>
                                            ) : (
                                                <LinkContainer to={drop.to} disabled={drop?.disabled || false}>
                                                    <NavDropdown.Item>{drop.label}</NavDropdown.Item>
                                                </LinkContainer>
                                            )}
                                            </>
                                        ) : ""}
                                        </>
                                    )}
                                    </>
                                )}
                            </NavDropdown>
                        ) : (
                            <LinkContainer to={head.to}>
                                <Nav.Link disabled={head.disabled ? true : false}>{head.label}</Nav.Link>
                            </LinkContainer>
                        )}
                        </>
                    )}
                </Nav>
        </Navbar.Collapse>
            </Container>
        </Navbar>
        </>
    )
}