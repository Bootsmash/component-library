import React from 'react';

import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import '../../node_modules/bootstrap/dist/js/bootstrap.js';

import { APIProvider } from '../components/DataProvider';

export default {
    title: 'ApiProvider',
    component: APIProvider,
};

const access = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjczODc1MTAzLCJpYXQiOjE2NzM3ODg3MDMsImp0aSI6IjRhYjJjMDA4NmUxYzQ5NzBiM2FjZDQwZGU3NjIwZjY1IiwidXNlcl91dWlkIjoiNTg5ZTlmYjctZDY3OS00ZjNiLTg4ZGItMWEzM2I3NWM4NmRjIn0.5HoOtFPGUeE1hdCWw4ysj8BX1msxrurSChqgHWJSGhY"

const Template = (args) => <APIProvider {...args} />;

export const ApiProvider = Template.bind({});
ApiProvider.args = {
    options: {
        headers: [
            {label: 'Benutzername', value: 'username', pos: 'start'},
        ],
        bg: '',
        hover: true,
        unique: "uuid",
        api: {
            url: "http://127.0.0.1:8000/api/account/accounts/",
            access: access,
            order: "-created_at",
            caption: true,
            items: 12,
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
            refresh: 30, // Seconds
        }
    },
    variant: 'table-horizontal',
    add: {
        label: "Test"
    },
    loadMore: {
        label: "Mehr laden"
    }
}