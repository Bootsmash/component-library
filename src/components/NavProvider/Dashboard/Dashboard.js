import React from 'react'
import './Dashboard.css';

import { Link, useLocation } from 'react-router-dom';

export const DashboardTop = (props) => {
    var options = props.options || null

    return (
        <div className='dashbar-header dash'>
            <div class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0">
                <a class="navbar-brand col-md-3 col-lg-2 me-0 px-3" href="#">{props.title || "Example"}</a>
                <button class="navbar-toggler position-absolute d-md-none collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <input class="form-control form-control-dark w-100" type="text" placeholder="Search" aria-label="Search" />
                <div class="navbar-nav">
                    <div class="nav-item text-nowrap">
                    <a class="nav-link px-3" onClick={options?.logout?.function}>{options?.logout?.label || "Sign out"}</a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export const Dashboard = (props) => {
    var headers = props.headers || null
    var categorys = props.categorys || null
    var options = props.options || null

    return (
        <>
        <nav id="dashbarMenu" class="col-md-3 col-lg-2 d-md-block bg-light dashbar collapse dash">
            <div class="position-sticky pt-3">
                { headers ? (
                    <>
                    { categorys ? (
                        <>
                        <ul class="nav flex-column">
                        { headers.map((head, h) =>
                            <>
                            { !head.category || head.category == "default" ? (
                                <NavItem label={head.label} icon={head.icon} to={head.to} />
                            ) : ""}
                            </>
                        )}
                        </ul>
                        {categorys.map((category, c) =>
                            <>
                            <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                                <span>{category.label}</span>
                                {category?.add || category.icon ? (
                                    <a class="link-secondary link" onClick={category?.add}>
                                        <span>{category?.icon}</span>
                                    </a>
                                ) : ""}
                            </h6>
                            <ul class="nav flex-column mb-2">
                            { headers.map((head, h) =>
                                <>
                                { head?.category == category.value ? (
                                    <NavItem label={head.label} icon={head.icon} to={head.to} />
                                ) : ""}
                                </>
                            )}
                            </ul>
                            </>
                        )}
                        </>
                    ) : (
                        <>
                        <ul class="nav flex-column">
                        { headers.map((head, i) => 
                            <NavItem label={head.label} icon={head.icon} to={head.to} />
                        )}
                        </ul>
                        </>
                    )}
                    </>
                ) : ""}
            </div>
        </nav>
        </>
    )
}

const NavItem = ({label, icon, to}) => {
    var active = false

    var location = useLocation()

    if (to === location.pathname) {
        active = true
    }

    return (
        <li className='nav-item'>
            <Link to={to} className={`nav-link ${active ? "active" : ""}`}>
                {icon}
                {label}
            </Link>
        </li>
    )
}