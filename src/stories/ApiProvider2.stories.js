import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import '../../node_modules/bootstrap/dist/js/bootstrap.js';

import { APIProvider } from '../components/DataProvider';

import { default_fixes, get_dataid } from '../components';

import { BsCheckLg, BsXLg } from 'react-icons/bs';

export default {
    title: 'ApiProvider',
    component: APIProvider,
};

const access = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjc2ODE5NDY2LCJpYXQiOjE2NzY3MzMwNjYsImp0aSI6ImQ1MzVkODhlMzgyOTQyYjA4ZjdkNjg2ZWUxNzkyZjJlIiwidXNlcl91dWlkIjoiNjhhY2MwYjctZjc3Yy00MTdmLTgzY2MtOWJmNjA5N2U0ZDEyIn0.EKUMAz8HtWUAHyeRaVd80kCgqwu1BCQSdfB5GfWZb1Y"

const Template = (args) => <APIProvider {...args} />;

const onTest = e => {
    console.log(get_dataid(e))
}

export const ApiProvider2 = Template.bind({});
ApiProvider2.args = {
    options: {
        headers: [
            {label: '', value: 'default_img', format: 'image', pos: 'center', width: 40},
            {label: 'Name', value: 'name', pos: 'start'},
            {label: 'Benutzername', value: 'username', pos: 'start', display: 'xl'},
            {label: 'Passwort', value: 'password', pos: 'start', display: 'xxl'},
            {label: 'Nächste Zahlung', value: 'pay_day_next', format: 'future-to-now', fixes: JSON.parse(default_fixes())},
            {label: 'Nächste Zahlung', value: 'pay_day_next', format: 'date'},
            {label: 'Erstellt', value: 'created_at', format: 'past-to-now', fixes: JSON.parse(default_fixes()), pos: 'end', width: 125, display: 'sm'},
            {label: 'Bearbeitet', value: 'edited_at', format: 'past-to-now', pos: 'end', width: 125, display: 'xl', fixes: JSON.parse(default_fixes())},
            {label: 'Zahlungs-Abstand', value: 'pay_sequence', pos: 'end', width: 140, display: 'md'},
            {label: 'Zahlungs-Rythmus', value: 'pay_reccuring', pos: 'end', width: 150, display: 'md'},
            {label: 'Benutzer', value: 'clients_count+clients_max', space: ' / ', pos: 'center', width: 10, display: 'sm'},
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
                {label: 'Name', value: 'name'},
                {label: 'Erstellt am', value: 'created_at', format: 'date'},
                {label: 'Bearbeitet am', value: 'edited_at', format: 'date'},
                {label: 'Aktiv', format: 'bool', value: 'name', bool: {true: <BsCheckLg className='text-success'/>, false: <BsXLg className='text-danger'/>}},
                {label: 'Zahlungs-Abstand', value: 'pay_reccuring'},
                {label: 'Zahlungs-Zyklus', value: 'pay_sequence'},
                {label: 'Erste Zahlung', value: 'pay_start', format: 'date'},
                {label: 'Letzte Zahlung', value: 'pay_day_last', format: 'date'},
                {label: 'Nächste Zahlung', value: 'pay_day_next', format: 'date-to-now', fixes: JSON.parse(default_fixes())},
                {label: 'Benutzername', value: 'username'},
                {label: 'Passwort', value: 'password'},
                {label: 'Preis (Ges)', value: 'price_host.amount', format: 'number', suffix: '€'},
                {label: 'Preis (Nutzer)', value: 'price_client', format: 'number', suffix: '€'},
                {label: 'Aktuelle Nutzer', value: 'clients_count'},
                {label: 'Max Nutzer', value: 'clients_max'},
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