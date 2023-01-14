import React from 'react';
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { generate_prefix } from '../../DataProvider';

export const Topbar = ({style, headers, title}) => {

    const prf_drop = generate_prefix(4)
    const prf_head = generate_prefix(4)

    return (
        <>
        <Navbar bg={style || 'light'} expand="lg" variant={style || 'light'}>
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
                                menuVariant={style || 'light'}
                                key={`${prf_head}-${h}-${head.label}`}
                            >
                                { head.dropdown.map((drop, d) =>
                                    <>
                                    {drop.label == "divider" && !drop?.hidden ? (
                                        <NavDropdown.Divider key={`${prf_drop}-${d}-${drop.label}`}/>
                                    ) : (
                                        <>
                                        {!drop?.hidden ? (
                                            <>
                                            {drop.execute ? (
                                                <a className={`dropdown-item function-link ${drop?.disabled ? 'disabled' : ''}`}>
                                                    {drop.label}
                                                </a>
                                            ) : (
                                                <LinkContainer to={drop?.to} disabled={drop?.disabled || false}>
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
                            <>
                            {!head.hidden ? (
                                <>
                                {head?.execute ? (
                                    <a className={`nav-link function-link ${head.disabled ? 'disabled' : ''}`} onClick={head.execute}>
                                        {head.label}
                                    </a>
                                ) : (
                                    <LinkContainer to={head.to}>
                                        <Nav.Link disabled={head.disabled ? true : false}>{head.label}</Nav.Link>
                                    </LinkContainer>
                                )}
                                </>
                            ) : ""}
                            </>
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