import React from 'react';
import { Table } from 'react-bootstrap';
import { generate_prefix, get_value, get_icon } from '../functiones';
import { FormatProvider } from '../../FormatProvider/index';

const Vertical = (props) => {

    var data = props.children;
    const headers = props['headers'];
    var options = props['options'] || [];

    const head_prefix = generate_prefix(4)
    const body_prefix = generate_prefix(4)

    var caption = options.caption || null

    return (
        <>
        <Table 
            hover={options?.hover || false}
            bordered={options?.bordered || false}
            striped={options?.striped || false}
            variant={options.variant}
            className={`align-middle table-${options.bg || ''} text-${options.bg == 'dark' ? options.color || 'light' : 'dark'}`} size={options.size || 'lg'}
        >
            { caption ? (
                <caption>{caption}</caption>
            ) : ""}
            {headers.map((head, h) =>
                <tbody>
                    <tr className='align-middle'>
                        <th className='align-middle'>
                            {head.label} {get_icon(head.icon || null)}
                        </th>
                        { data.length ? (
                            <>
                            {data.map((item, i) =>
                                <FormatProvider 
                                    value={get_value(head.value, item, (head.space || null))} 
                                    format={head.format || null} 
                                    ct="col"
                                    pos={'end'}
                                    colspan={head.colspan}
                                    fixes={head.fixes || null}
                                    suffix={head.suffix || null}
                                />
                            )}
                            </>
                        ) : (
                            <>
                            <FormatProvider 
                                value={get_value(head.value, data.user, (head.space || null))} 
                                format={head.format || null}
                                ct="col"
                                pos={'end'}
                                colspan={head.colspan}
                                fixes={head.fixes || null}
                                suffix={head.suffix || null}
                            />
                            </>
                        )}
                    </tr>
                </tbody>
            )}
        </Table>
        </>
    )
}
export default Vertical;