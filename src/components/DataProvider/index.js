import React from 'react';

import { TableHorizontal, TableVertical } from './Table'
import { Cards } from './Card';

export const DataProvider = (props) => {
    var data = props['value']
    const headers = props['headers']
    var options = props['options'] || []

    var variant;

    if (props['variant'])
        variant = props['variant']

    switch (variant) {
        case 'table-horizontal':
            return (
                <TableHorizontal headers={headers} options={options}>{data}</TableHorizontal>
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