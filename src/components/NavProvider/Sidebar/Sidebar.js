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
                        {!head?.hidden && !head?.dropdown ? (
                            <SidebarItem label={head.label} to={head.to || null} icon={head.icon} color={color} disabled={head.disabled || false} hidden={head.hidden || false} execute={head.execute}/>
                        ) : ""}
                        </>
                    )}
                    </ul>
                ) : ""}
                <hr />
                {usermenu ? (
                   <div className="dropdown usermenu">
                        <a className={`d-flex align-items-center function-link text-center ${color === "dark" ? "text-white" : "text-black"} text-decoration-none dropdown-toggle`} id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                            <img src={`${user.image || 'https://github.com/mdo.png'}`} alt="" width="32" height="32" className="rounded-circle me-2" />
                            <strong>{user?.username || ""}</strong>
                        </a>
                        <ul className={`dropdown-menu dropdown-menu-${color} text-small shadow`} aria-labelledby="dropdownUser1">
                            {usermenu.map((drop, d) =>
                                <>
                                {drop.label == "divider" ? (
                                    <li key={`${d}-${drop.label}`}><hr className="dropdown-divider" /></li>
                                ) : (
                                    <li key={`${d}-${drop.label}`}>
                                        { drop.execute ? (
                                            <a className={`dropdown-item function-link ${drop.disabled ? 'disabled' : ''}`} onClick={drop?.execute || null}>
                                                {drop.label}
                                            </a>
                                        ) : (
                                            <NavLink className={`dropdown-item ${drop.disabled ? 'disabled' : ''}`} to={drop.to}>
                                                {drop.label}
                                            </NavLink>
                                        )}
                                    </li>
                                )}
                               </>
                            )}                            
                        </ul>
                    </div>
                ) : ""}
            </div>
        </div>

        {/* Only Icons Sidebar */}
        <div className={`sidebar d-md-none ${color === "dark" ? "text-white bg-dark" : "bg-light"}`}>
            <a href="/" className='d-block p-3 link-dark text-decoration-none' title='Icon-only' data-bs-toggle='tooltip' data-bs-placement='right'>
                <span className='visually-hidden'>Icon-only</span>
            </a>
            { headers ? (
                <ul className='nav nav-pills nav-flush flex-column mb-auto text-center'>
                { headers.map((head, h) =>
                    <>
                    {!head?.hidden && !head?.dropdown ? (
                        <SidebarIcon to={head.to} icon={head.icon} disabled={head.disabled || false} hidden={head.hidden || false} execute={head.execute}/>
                    ) : ""}
                    </>
                )}
            </ul>
            ) : ""}
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
                <a className={`nav-link function-link ${disabled ? "disabled" : ""} ${color === "dark" ? "text-white" : active ? "text-white" : "text-black"}`} onClick={execute}>
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

const SidebarIcon = ({to, icon, hidden, execute}) => {
    var active = false

    var location = useLocation()

    if (to === location.pathname) {
        active = true
    }
    return (
        <>
        <li>
            {execute ? (
                <a className={`nav-link py-3 function-link ${hidden ? 'd-none' : ''}`} onClick={execute}>
                    {icon}
                </a>
            ) : (
                <NavLink className={`nav-link py-3 ${hidden ? 'd-none' : ''}`} to={to}>
                    {icon}
                </NavLink>
            )}
        </li>
        </>
    )
}