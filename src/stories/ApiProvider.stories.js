import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import '../../node_modules/bootstrap/dist/js/bootstrap.js';

import { APIProvider } from '../components/DataProvider';

export default {
    title: 'ApiProvider',
    component: APIProvider,
};

import { default_fixes } from '../components'
import { BsCheckLg, BsPencilSquare, BsTrash, BsXLg } from 'react-icons/bs';

const access = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjczOTg4OTkzLCJpYXQiOjE2NzM5MDI1OTMsImp0aSI6ImYzMjMwZDMzYzljOTQ5YTU5YmI4MTZjMDhlZWUzZDUwIiwidXNlcl91dWlkIjoiMzMyM2Q5ZTUtYzIwMS00ODg5LWE4ZDgtZTc1MjY0ZDU2ZDVjIn0.MO6jC8VQ2uHelRLV50xo5AnXYFBU15H8xGxdeDc2W-o"

const Template = (args) => <APIProvider {...args} />;

export const ApiProvider = Template.bind({});
ApiProvider.args = {
    options: {
        headers: [
            {label: 'Benutzername', value: 'username', pos: 'start'},
            {label: 'Name', value: 'last_name+first_name', space: ', ', pos: 'start', display: 'lg'},
            {label: 'UUID', value: 'uuid', pos: 'end',  display: 'xl'},
            {label: 'Email', value: 'email', pos: 'end', display: 'md'},
            {label: 'Mitarbeiter', value: 'is_staff', format: "bool", bool: {true: <BsCheckLg className='text-success'/>,false: <BsXLg className='text-danger'/>}, display: 'md', pos: 'center', width: 20},
            {label: 'Administrator', value: 'is_superuser', format: "bool", bool: {true: <BsCheckLg className='text-success'/>,false: <BsXLg className='text-danger'/>}, display: 'md', pos: 'center', width: 20},
            {label: 'Beigetreten', value: 'created_at', format: 'date-to-now', fixes: JSON.parse(default_fixes()), pos: 'end', edit: "none"},
        ],
        hover: true,
        striped: false,
        bordered: true,
        bg: '',
        size: "sm",
        unique: "uuid",
        highlight: {value: "8ead9430-85cc-4985-b180-eeb35f09a465", class: "table-success"},
        disable: {value: "8ead9430-85cc-4985-b180-eeb35f09a465", buttons: ["edit", "delete"]},
        api: {
            url: "http://127.0.0.1:8000/api/account/accounts/",
            access: access,
            order: "-created_at",
            caption: true,
            items: 4,
            search: {
                label: "Suche ...",
                pos: "center"
            },
            delete: {
                title: (
                    <>
                    Benutzer <d-var value='username'/> wirklich löschen?
                    </>
                ),
                desc: (
                    <>
                    Dieser Vorgang kann nicht Rückgängig gemacht werden!<br />
                    Untergeordnete Elemente bleiben bestehen
                    </>
                ),
                icon: <BsTrash className='text-danger'/>
            },
            edit: {
                title: (
                    <>
                    Benutzer: <d-var value='username'/>
                    </>
                ),
            },
            create: (
                <>
                Benutzer hinzufügen
                </>
            ),
            fields: [
                {label: "Benutzername", value: 'username', type: "text", disabled: true, edit: true, create: true, required: true},
                {label: "Vorname", value: 'first_name', type: "text", edit: true, create: true, required: true},
                {label: "Nachname", value: 'last_name', type: "text", edit: true, create: true, required: true},
                {label: "Email", value: 'email', type: "email", edit: true, create: true, required: true},
                {label: "Mitarbeiter", value: 'is_staff', type: "switch", edit: true},
                {label: "Administrator", value: 'is_superuser', type: "switch", edit: true},
                {label: "Password", value: 'password', type: "password", edit: false, create: true, required: true},
                {label: "UUID", value: 'uuid', type: "text", hidden: true, edit: true},
            ],
            refresh: false, // Seconds
            loadMore: {
                label: "Mehr laden"
            },
        }
    },
    variant: 'table-horizontal',
}