import React from 'react';

import { NavProvider, DashboardTop } from '../components';
import { Row, Col } from 'react-bootstrap';

import { BsHouse, BsPlusLg, BsSpeedometer } from 'react-icons/bs';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import user from './user.json';

import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import '../../node_modules/bootstrap/dist/js/bootstrap.js';

const test = () => {
    console.log("test")
}

export default {
    title: 'Navigation',
    component: NavProvider,
    argTypes: {
        style: {
            options: ['light', 'dark'],
            control: { type: 'radio' },
            defaultValue: 'light',
        },
    }
};

const headers = [
    {label: "Home", to: "/", icon: <BsHouse />, default: "true"},
    {label: "Dashboard", to: "/dashboard", icon: <BsSpeedometer />},
    {label: "Hidden", to: "/dashboard", icon: <BsSpeedometer />, hidden: true},
    {label: "Disabled", to: "/contact", icon: <BsSpeedometer />, disabled: true, category: "test"},
    {label: "Execute", icon: <BsSpeedometer />, execute: test},
    {label: "User", icon: <BsSpeedometer />, dropdown: [
        {label: "logout", to: "/logout"},
        {label: "disabled", to: "/456", disabled: true},
        {label: "hidden", to: "/123", hidden: true},
        {label: "divider"},
        {label: "execute", execute: test},
        {label: "execute", execute: test, disabled: true},
    ]},
]

const TemplateSide = (args) => (
    <BrowserRouter>
        <Routes>
            <Route path="*" element={
                <Row>
                    <Col xs={2} sm={2} md={4} lg={3} xl={2}>
                        <NavProvider headers={headers} user={user} {...args} />
                    </Col>
                    <Col>
                    </Col>
                </Row>
            } />
        </Routes>
    </BrowserRouter>
);

const TemplateTop = (args) => (
    <BrowserRouter>
        <Routes>
            <Route path="*" element={
                <NavProvider headers={headers} {...args} />
            } />
        </Routes>
    </BrowserRouter>
);

const TemplateDash = (args) => (
    <BrowserRouter>
        <Routes>
            <Route path="*" element={
                <>
                <DashboardTop headers={headers} {...args}/>
                <Row>
                    <Col>
                        <NavProvider headers={headers} {...args} />
                    </Col>
                    <Col>
                    </Col>
                </Row>
                </>
            } />
        </Routes>
    </BrowserRouter>
);

export const Sidebar = TemplateSide.bind({});
Sidebar.args = {
    title: "Octagon",
    variant: "sidebar",
    usermenu: [
        {label: "disabled", to: "/456", disabled: true},
        {label: "divider"},
        {label: "Logout", execute: test},
    ],
}

export const Navbar = TemplateTop.bind({});
Navbar.args = {
    title: "Octagon",
    variant: "navbar",
}

export const Dashboard = TemplateDash.bind({});
Dashboard.args = {
    title: "Octagon",
    variant: "dashboard",
    categorys: [
        {label: "Einstellungen", value: "test"}
    ],
    options: {
        logout: {label: "Logout"}
    }
}