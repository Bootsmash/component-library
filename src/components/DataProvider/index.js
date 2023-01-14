import React from 'react';
import { TableHorizontal, TableVertical } from './Table';
import { Cards } from './Card';

export const DataProvider = (props) => {
    var data = props['value']
    const headers = props.options.headers
    const subtable = props.subtable || null
    var options = props['options'] || []
    var user = props.user || null;

    var variant;

    if (props['variant'])
        variant = props['variant']

    switch (variant) {
        case 'table-horizontal':
            return (
                <TableHorizontal headers={headers} options={options} subtable={subtable} user={user}>{data}</TableHorizontal>
            );
        case 'table-vertical':
            return (
                <TableVertical headers={headers} options={options}>{data}</TableVertical>
            )
        case 'card':
            return (
                <Cards headers={headers} options={options}>{data}</Cards>
            )
        default:
            return (
                <h1 className='text-danger'>DataProvider not Founded</h1>
            )
    }
}

export { VarText } from './VarText';