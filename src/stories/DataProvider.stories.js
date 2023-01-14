import React from 'react';

import { DataProvider } from '../components';

import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import '../../node_modules/bootstrap/dist/js/bootstrap.js';

import { BsPerson, BsCalendar, BsPencilSquare } from 'react-icons/bs';

import users from './users.json';
import user from './user.json';

export default {
    title: 'DataProvider',
    component: DataProvider,
};

const onLoad = () => {
    console.log("loading")
}

const Template = (args) => <DataProvider value={users} {...args} />;

export const Horizontal = Template.bind({});
Horizontal.args = {
    options: {
        headers: [
            {label: 'Benutzername', value: 'username', pos: 'start'},
            {label: 'UUID', value: 'profile.uuid', pos: 'end', display: 'xl', icon: {icon: <BsPerson />, pos: 'start'}},
            {label: 'Email', value: 'email', pos: 'center', display: 'sm'},
            {label: 'test', value: 'test', pos: 'center', format: 'number', suffix: 'kwh'},
            {label: 'Name', value: 'last_name+first_name', space: ', ', pos: 'end', display: 'sm'},
            {label: 'Erstellt', value: 'date_joined', format: 'date-to-now', suffix: "Uhr", pos: 'end', display: 'md', icon: {icon: <BsCalendar />, pos: 'start'}, fixes:{now: 'jetzt', default: 'vor', final: 'am', minutes: 'Minuten', hour: 'Stunde', hours: 'Stunden',day: 'gestern', days: 'Tagen', week: 'Woche', weeks: 'Wochen'}}
        ],
        caption: '',
        bg: '',
        buttons: [
            {label: 'edit', icon: <BsPencilSquare />},
            {label: 'test', tooltip: {pos: 'top', desc: 'Test Button'}, function: onLoad},
        ],
        hover: true,
    },
    variant: 'table-horizontal',
    subtable: {
        headers: [
            {label: 'ID', value: 'id', pos: 'end'},
            {label: 'Benutzername', value: 'username', pos: 'end'},
            {label: 'UUID', value: 'profile.uuid', pos: 'end'},
            {label: 'Email', value: 'email', pos: 'end'},
            {label: 'Name', value: 'first_name+last_name', pos: 'end'},
            {label: 'Nachname', value: 'last_name', pos: 'end'},
            {label: 'Vorname', value: 'first_name', pos: 'end'},
            {label: 'Beigetreten', value: 'date_joined', pos: 'end', format: 'date-time', suffix: 'Uhr'},
            {label: 'Letzter Login', value: 'last_login', pos: 'end', format: 'date-time', suffix: 'Uhr'},
        ],
        options: {
            size: 'sm',
            bg: 'success',
            hover: true
        }
    }
}

export const Vertical  = Template.bind({});
Vertical.args = {
    options: {
        headers: [
            {label: 'Benutzername', value: 'username', pos: 'start'},
            {label: 'UUID', value: 'profile.uuid', pos: 'end', display: 'xl', icon: {icon: <BsPerson />, pos: 'start'}},
            {label: 'Email', value: 'email', pos: 'center', display: 'sm'},
            {label: 'test', value: 'test', pos: 'center', format: 'number', suffix: 'kwh'},
            {label: 'Name', value: 'last_name+first_name', space: ', ', pos: 'end', display: 'sm'},
            {label: 'Erstellt', value: 'date_joined', format: 'date-to-now', suffix: "Uhr", pos: 'end', display: 'md', icon: {icon: <BsCalendar />, pos: 'start'}, fixes:{now: 'jetzt', default: 'vor', final: 'am', minutes: 'Minute/n', hours: 'Stunde/n', days: 'Tag/en', weeks: 'Woche/n'}}
        ],
        caption: '',
        bg: '',
        hover: true,
    },
    variant: 'table-vertical',
}

export const Cards = Template.bind({});
Cards.args = {
    options: {
        body: {
            title: 'username',
            subtitle: 'first_name+last_name',
            content: (
                <div>
                    UUID: <d-var value="profile.uuid"/><br />
                </div>
            ),
        },
        img: {
            baseurl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyZctnMsqtlG5FsSmE0OCLdgy-a4Cqm1WbDvUcJPiB&s",
        },
        grid: {
            md: 2,
            lg: 3
        },
    },
    variant: 'card',
}