import React from 'react';
import { Table, Button } from 'react-bootstrap';
import { generate_prefix, get_value, get_display, get_icon } from '../functiones';
import { FormatProvider } from '../../FormatProvider/index';
import { TableButtons } from './buttons';
import { BsPlusLg, BsDash } from 'react-icons/bs';

const Vertical = (props) => {

    var data = props.children;
    const headers = props['headers'];
    var options = props['options'] || [];

    const head_prefix = generate_prefix(4)
    const body_prefix = generate_prefix(4)

    var caption = options.caption || null

    return (
        <>
        <Table hover variant={options.variant} className={`align-middle table-${options.bg || ''} text-${options.bg == 'dark' ? options.color || 'light' : 'dark'}`} size={options.size || 'lg'}>
            { caption ? (
                <caption>{caption}</caption>
            ) : ""}
            {headers.map((head, h) =>
                <tbody>
                    <tr className='align-middle'>
                        <th className='align-middle'>
                            {head.name} {get_icon(head.icon || null)}
                        </th>
                        {data.map((item, i) =>
                            <FormatProvider 
                                value={get_value(head.value, item, (head.space || null))} 
                                format={head.format || null} 
                                ct="col"
                                pos={'end'} 
                                colspan={head.colspan}
                                fixes={head.fixes || null}
                            />
                        )}
                    </tr>
                </tbody>
            )}
        </Table>
        </>
    )
}
export default Vertical;