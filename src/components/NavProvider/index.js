import { Sidebar } from './Sidebar/Sidebar';
import { Topbar } from './Topbar/Topbar';
import { Dashboard } from './Dashboard/Dashboard';

export const NavProvider = (props) => {
    var color = props.style || "light"
    var variant = props.variant || "none"
    var headers = props.headers || null
    var title = props.title || "Example"
    var options = props.options || null
    var categorys = props.categorys || null
    var usermenu = props.usermenu || null
    var user = props.user || null

    switch (variant) {
        case 'sidebar':
            return (
                <Sidebar color={color} headers={headers} title={title} usermenu={usermenu} user={user}/>
            );
        case 'navbar':
            return (
                <Topbar color={color} headers={headers} title={title} />
            );
        case 'dashboard':
            return (
                <Dashboard headers={headers} title={title} options={options} categorys={categorys}>{props.children}</Dashboard>
            );
        default:
            return (
                <h1 className='text-danger'>Navbar not Founded</h1>
            )
    }
}