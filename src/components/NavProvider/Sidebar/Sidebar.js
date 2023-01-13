import React from 'react';
import { Link, useLocation, NavLink } from 'react-router-dom';
import './Sidebar.css';

export const Sidebar = ({color, headers, title}) => {

    var color = color || "light"

    return (
        <>
        {/* Normal Sidebar */}
        <div className='sidebar d-none d-md-block'>
            <div className={`p-3 ${color === "dark" ? "text-white bg-dark" : "bg-light"}`}>
                <a href="/" class={`align-items-center mb-3 mb-md-0 me-md-auto text-decoration-none ${color === "dark" ? "text-white" : "text-black"}`}>
                    <span class="fs-4">{title}</span>
                </a>
                <hr />
                {headers ? (
                    <ul class="nav nav-pills flex-column mb-auto">
                    {headers.map((head, h) =>
                        <SidebarItem label={head.label} to={head.to} icon={head.icon} color={color} disabled={head.disabled || false}/>
                    )}
                </ul>
                ) : ""}
                <hr />
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
                    <SidebarIcon to={head.to} icon={head.icon} disabled={head.disabled || false} />
                )}
            </ul>
            ) : ""}
        </div>
        </>
    )
}

const SidebarItem = ({label, to, color, icon, disabled}) => {
    var active = false

    var location = useLocation()

    if (to === location.pathname) {
        active = true
    }

    if (!label || !to || !icon) {
        console.error("Nicht alle Attribute Angegeben (label, to, icon)")
        return ("")
    }

    return (
        <>
        <li className={`nav-item ${color === "dark" ? "" : "link-dark"}`}>
            <NavLink to={to} className={`nav-link ${disabled ? "disabled" : ""} ${color === "dark" ? "text-white" : active ? "text-white" : "text-black"}`}>
                {icon} {label}
            </NavLink>
        </li>
        </>
    )
}

const SidebarIcon = ({to, icon}) => {
    var active = false

    var location = useLocation()

    if (to === location.pathname) {
        active = true
    }
    return (
        <>
        <li>
            <NavLink className='nav-link py-3' to={to}>
                {icon}
            </NavLink>
        </li>
        </>
    )
}