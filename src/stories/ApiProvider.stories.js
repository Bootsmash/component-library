import React from 'react';

import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import '../../node_modules/bootstrap/dist/js/bootstrap.js';

import { APIProvider } from '../components/DataProvider';

export default {
    title: 'ApiProvider',
    component: APIProvider,
};

import { default_fixes } from '../components'

const access = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjczODc1MTAzLCJpYXQiOjE2NzM3ODg3MDMsImp0aSI6IjRhYjJjMDA4NmUxYzQ5NzBiM2FjZDQwZGU3NjIwZjY1IiwidXNlcl91dWlkIjoiNTg5ZTlmYjctZDY3OS00ZjNiLTg4ZGItMWEzM2I3NWM4NmRjIn0.5HoOtFPGUeE1hdCWw4ysj8BX1msxrurSChqgHWJSGhY"

const Template = (args) => <APIProvider {...args} />;

export const ApiProvider = Template.bind({});
ApiProvider.args = {
    options: {
        headers: [
            {label: 'Benutzername', value: 'username', pos: 'start', edit: "disabled"},
            {label: 'Name', value: 'last_name+first_name', space: ', ', pos: 'start', display: 'lg', edit: "text"},
            {label: 'UUID', value: 'uuid', pos: 'start',  display: 'xl', edit: "hidden"},
            {label: 'Email', value: 'email', pos: 'start', display: 'md', pos: 'end', edit: "text"},
            {label: 'Beigetreten', value: 'created_at', format: 'date-to-now', fixes: JSON.parse(default_fixes()), pos: 'end', edit: "none"},
        ],
        bg: '',
        hover: true,
        unique: "uuid",
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
                )
            },
            edit: {
                title: (
                    <>
                    Benutzer: <d-var value='username'/>
                    </>
                ),
                fields: [
                    {label: "Benutzername", value: 'username', edit: "text", disabled: true},
                    {label: "Vorname", value: 'first_name', edit: "text"},
                    {label: "Nachname", value: 'last_name', edit: "text"},
                    {label: "UUID", value: 'uuid', edit: "text", hidden: true},
                    {label: "Email", value: 'email', edit: "email"},
                ]
            },
            refresh: false, // Seconds
            loadMore: {
                label: "Mehr laden"
            },
        }
    },
    variant: 'table-horizontal',
}