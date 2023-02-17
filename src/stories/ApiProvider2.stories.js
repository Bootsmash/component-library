import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import '../../node_modules/bootstrap/dist/js/bootstrap.js';

import { APIProvider } from '../components/DataProvider';

import { get_dataid } from '../components';

export default {
    title: 'ApiProvider',
    component: APIProvider,
};

const access = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjc2NzMzMDA0LCJpYXQiOjE2NzY2NDY2MDQsImp0aSI6IjZkNDAyNWYwZDk2ZjRiNjlhOGEzNjEyNTY3ZmY5ZjYyIiwidXNlcl91dWlkIjoiNjhhY2MwYjctZjc3Yy00MTdmLTgzY2MtOWJmNjA5N2U0ZDEyIn0.wtodQcGGjXS1fFonm3UiFc09E90YualrVOdesEsDxGk"

const Template = (args) => <APIProvider {...args} />;

const onTest = e => {
    console.log(get_dataid(e))
}

export const ApiProvider2 = Template.bind({});
ApiProvider2.args = {
    options: {
        headers: [
            {label: 'Name', value: 'name', pos: 'start', sum: true},
            {label: '', value: 'default_img', format: 'image', pos: 'start', sum: 'count', size: 40},
        ],
        hover: true,
        striped: false,
        bordered: true,
        bg: '',
        size: "sm",
        unique: "uuid",
        sum: {
            label: "Summe",
            variant: 'success'
        },
        api: {
            url: "http://127.0.0.1:8000/api/services/all/",
            access: access,
            order: "-name",
            caption: true,
            items: 4,
            search: {
                label: "Suche ...",
                pos: "center"
            },
            buttons: [
                {label: 'test', tooltip: {pos: 'top', desc: 'Test Button'}, execute: onTest},
            ],
            refresh: false, // Seconds
        }
    },
    variant: 'table-horizontal',
}