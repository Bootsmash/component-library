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
            {label: '', value: 'default_img', format: 'image', size: 40, pos: 'center', width: 40},
            {label: 'Name', value: 'name', pos: 'start'},
            {label: 'Benutzername', value: 'username', pos: 'start'},
            {label: 'Passwort', value: 'password', pos: 'start'},
            {label: 'Erstellt am', value: 'created_at', format: 'date', pos: 'end', width: 125},
            {label: 'Bearbeitet am', value: 'edited_at', format: 'date', pos: 'end', width: 125},
            {label: 'Zahlungs-Abstand', value: 'pay_sequence', pos: 'end', width: 140},
            {label: 'Zahlungs-Rythmus', value: 'pay_reccuring', pos: 'end', width: 150},
            {label: 'Benutzer', value: 'clients_count+clients_max', space: ' / ', pos: 'center', width: 10},
            {label: 'Kosten (Nuter)', value: 'price_client', format: 'number', suffix: '€', pos: 'end', width: 115},
            {label: 'Kosten (Ges)', value: 'price_host.amount', format: 'number', suffix: '€', pos: 'end', width: 100, sum: 'sum'},
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
            url: "http://127.0.0.1:8000/api/services/host/services/",
            access: access,
            order: "-name",
            caption: true,
            items: 4,
            search: {
                label: "Suche ...",
                pos: "center"
            },
            refresh: false, // Seconds
        },
        subtable: {
            headers: [
                {label: 'Benutzer', value: 'uuid'},
            ],
            options: {
                size: 'sm',
                bg: 'success',
                hover: true
            },
            button: {
                tooltip: {pos: 'top', desc: 'Mehr'},
            }
        }
    },
    variant: 'table-horizontal',
}