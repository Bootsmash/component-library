import React from 'react';
import { FormGroup } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useLocation, NavLink } from 'react-router-dom';
import './Sidebar.css';

export const Sidebar = ({color, headers, title, usermenu, user}) => {

    var color = color || "light"

    return (
        <>
        {/* Normal Sidebar */}
        <div className='sidebar d-none d-md-block'>
            <div className={`p-3 ${color === "dark" ? "text-white bg-dark" : "bg-light"}`}>
                <a href="/" className={`align-items-center mb-3 mb-md-0 me-md-auto text-decoration-none ${color === "dark" ? "text-white" : "text-black"}`}>
                    <span className="fs-4">{title}</span>
                </a>
                <hr />
                {headers ? (
                    <ul className="nav nav-pills flex-column mb-auto">
                    {headers.map((head, h) =>
                        <>
                        {!head.hidden && !head.dropdown ? (
                            <SidebarItem 
                                label={head.label}
                                to={head.to || null}
                                icon={head.icon}
                                color={color}
                                disabled={head.disabled || false}
                                hidden={head.hidden || false}
                                execute={head.execute}
                            />
                        ) : ""}
                        </>
                    )}
                    </ul>
                ) : ""}
                <hr />
                <UserMenu 
                    usermenu={usermenu}
                    user={user}
                />
            </div>
        </div>

        {/* Only Icons Sidebar */}
        <div className={`sidebar d-md-none ${color === "dark" ? "text-white bg-dark" : "bg-light"}`}>
            <a href="/" className='d-block p-3 link-dark text-decoration-none' title='Icon-only' data-bs-toggle='tooltip' data-bs-placement='right'>
                <span className='visually-hidden'>Icon-only</span>
            </a>
            { headers ? (
                <ul className='nav nav-pills nav-flush flex-column mb-auto text-center'>
                { headers.map((head,h) =>
                    <>
                    {!head.hidden && !head.dropdown ? (
                        <SidebarIcon 
                            to={head.to}
                            icon={head.icon}
                            disabled={head.disabled || false}
                            hidden={head.hidden || false}
                            execute={head.execute}
                        />
                    ) : ""}
                    </>
                )}
            </ul>
            ) : ""}
            <UserMenu 
                usermenu={usermenu}
                user={user}
                icononly={true}
            />
        </div>
        </>
    )
}

const SidebarItem = ({label, to, color, icon, disabled, hidden, execute}) => {
    var active = false

    var location = useLocation()

    if (to === location.pathname) {
        active = true
    }

    if (!label || !icon) {
        console.error("Nicht alle Attribute Angegeben (label, to, icon)")
        return ("")
    }

    return (
        <>
        <li className={`nav-item ${color === "dark" ? "" : "link-dark"} ${hidden ? 'd-none' : ''}`}>
            {execute ? (
                <a className={`nav-link nav-function-link ${disabled ? "disabled" : ""} ${color === "dark" ? "text-white" : active ? "text-white" : "text-black"}`} onClick={execute}>
                    {icon} {label}
                </a>
            ) : (
                <NavLink to={to} className={`nav-link ${disabled ? "disabled" : ""} ${color === "dark" ? "text-white" : active ? "text-white" : "text-black"}`}>
                    {icon} {label}
                </NavLink>
            )}
        </li>
        </>
    )
}

const SidebarIcon = ({to, icon, hidden, execute, disabled}) => {
    var active = false

    var location = useLocation()

    if (to === location.pathname) {
        active = true
    }
    return (
        <>
        <li>
            {execute ? (
                <a className={`nav-link py-3 nav-function-link ${hidden ? 'd-none' : ''} ${disabled ? "disabled" : ""}`} onClick={execute}>
                    {icon}
                </a>
            ) : (
                <NavLink className={`nav-link py-3 ${hidden ? 'd-none' : ''} ${disabled ? "disabled" : ""}`} to={to}>
                    {icon}
                </NavLink>
            )}
        </li>
        </>
    )
}

const UserMenu = ({usermenu, user, icononly=false}) => {
    if (!usermenu || !user)
        return ""
    
    if (icononly) {
        return (
            <div class="dropdown border-top">
                <a class="function-link d-flex align-items-center justify-content-center p-3 link-dark text-decoration-none dropdown-toggle" id="dropdownUser" data-bs-toggle="dropdown" aria-expanded="false">
                    <img src={`${user.image || "https://github.com/mdo.png"}`} alt={user.username || "Profilbild"} width="24" height="24" class="rounded-circle" />
                </a>
                <UserMenuBody usermenu={usermenu} />
            </div>
        )
    } else {
        return (
            <div class="dropdown">
                <a class="function-link d-flex align-items-center link-dark text-decoration-none dropdown-toggle" id="dropdownUser" data-bs-toggle="dropdown" aria-expanded="false">
                    <img src={`${user.image || "https://github.com/mdo.png"}`} alt={user.username || "Profilbild"} width="32" height="32" class="rounded-circle me-2" />
                    <strong>{user.username || "Not Found"}</strong>
                </a>
                <UserMenuBody usermenu={usermenu} />
            </div>
        )
    }
}

const UserMenuBody = ({usermenu}) => {
    return (
        <>
        <ul class="dropdown-menu text-small shadow" aria-labelledby="dropdownUser">
            {usermenu.map((menu, m) =>
                <>
                {!menu?.hidden ? (
                    <>
                    {menu.label == "divider" ? (
                        <li><hr class="dropdown-divider" /></li>
                    ) : (
                        <>
                        {menu?.execute ? (
                            <li>
                                <a className={`dropdown-item function-link ${menu.disabled ? "disabled" : ""}`} onClick={menu.execute}>
                                    {menu.label}
                                </a>
                            </li>
                        ) : (
                            <li>
                                <NavLink to={menu.to} className={`dropdown-item ${menu.disabled ? "disabled" : ""}`}>
                                    {menu.label}
                                </NavLink>
                            </li>
                        )}
                        </>
                    )}
                    </>
                ) : ""}   
                </>
            )}
        </ul>
        </>
    )
}