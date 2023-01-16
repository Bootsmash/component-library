import React from 'react';

import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import '../../node_modules/bootstrap/dist/js/bootstrap.js';

import { APIProvider } from '../components/DataProvider';

export default {
    title: 'ApiProvider',
    component: APIProvider,
};

import { default_fixes } from '../components'

const access = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjczOTU1NjgyLCJpYXQiOjE2NzM4NjkyODIsImp0aSI6ImU3NmNkZjc1NTRiNjQwNDQ5MTE3MjRiMDcyOGRiYTJkIiwidXNlcl91dWlkIjoiNDc0M2ZkZGMtMDIyOS00NWE3LTg2YmEtMzBhODBhMzUyOWQwIn0.Glg9yxRmgKZChnlAq7WjnikhkGLWVBicF-VhDXRihjg"

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
            edit: (
                <>
                Benutzer: <d-var value='username'/>
                </>
            ),
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