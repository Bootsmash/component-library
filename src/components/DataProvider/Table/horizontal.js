import React from 'react';
import { Table, Button } from 'react-bootstrap';
import { generate_prefix, get_value, get_display, get_icon, get_colspan, has_permission } from '../functiones';
import { get_sum, get_format } from './sum';
import { FormatProvider } from '../../FormatProvider/index';
import { TableButtons } from './buttons';
import { BsPlusLg } from 'react-icons/bs';
import { TableVertical } from '.';

const Horizontal = (props) => {

    var data = props.children;
    const headers = props['headers'];
    var subtable = props['subtable'] || null;
    var options = props['options'] || [];
    var user = props.user || null;

    const head_prefix = generate_prefix(4)
    const body_prefix = generate_prefix(4)


    var caption = options.caption || null

    return (
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
            <thead>
                <tr>
                    { headers.map((head, h) =>
                        <>
                        <th key={`${head_prefix}-${head.label}`} 
                            className={`text-${head.pos || 'start'} ${get_display(head.display || null, 'col')} align-middle`}
                        >   
                            {get_icon(head.icon || null, 'start')} {head.label} {get_icon(head.icon || null, 'end')}
                        </th>
                        </>
                    )}
                    <TableButtons buttons={options.buttons || null} ct="thead" user={user|| null}/>
                </tr>
            </thead>
            <tbody>
                { data.map((item, d) =>
                    <>
                    <tr key={`${body_prefix}-${item[0]}`}>
                        { headers.map((head, h) =>
                            <>
                            <FormatProvider 
                                value={get_value(head.value, item, (head.space || null))} 
                                format={head.format || null} 
                                ct="col"
                                pos={head.pos || 'start'} 
                                display={head.display || null}
                                fixes={head.fixes || null}
                                suffix={head.suffix || null}
                            />
                            </>
                        )}
                        { options && options.buttons ? (
                            <TableButtons buttons={options.buttons} ct="tbody" user={user|| null}/>
                        ) : ""}
                    </tr>
                    { subtable ? (
                        <tr>
                            <td colSpan={get_colspan(headers, options.buttons)}>
                                <TableVertical headers={subtable.headers} options={subtable.options || null}>{item}</TableVertical>
                            </td>
                        </tr>
                    ) : ""}
                    </>
                )}
                { options?.sum ? (
                    <tr className={`table-${options.sum.variant || 'success'}`}>
                        { headers.map((head, h) =>
                            <>
                            { h == 0 ? (
                                <th>{options.sum.label}</th>
                            ) : (
                                <>
                                { head.sum ? (
                                    <FormatProvider
                                        value={get_sum(data, head)}
                                        format={get_format(head)} 
                                        ct="col-th"
                                        pos={head.pos || 'start'} 
                                        colspan={head.colspan}
                                        display={head.display || null}
                                        fixes={head.fixes || null}
                                    />
                                ) : (
                                    <td className={get_display(head?.display, 'col')}></td>
                                )}
                                </>
                            )}
                            </>
                        )}
                        { options.buttons.map((btn, b) =>
                            <>
                            { btn?.permissions ? (
                                <>
                                { has_permission(user, btn.permissions) && user ? (
                                    <>
                                    <td className={get_display(btn?.display, 'col')}></td>
                                    </>
                                ) : "" }
                                </>
                            ) : (
                                <>
                                <td className={get_display(btn?.display, 'col')}></td>
                                </>
                            )}
                            </>
                        )}
                    </tr>
                ) : ""}
                { options?.add ? (
                    <tr>
                        <td colSpan={get_colspan(headers, options.buttons)}>
                            <Button 
                                variant='success'
                                className='w-100'
                                onClick={options.add.function}
                                disabled={options.add.function ? false : true}
                            >
                                <BsPlusLg /> {options.add.desc}
                            </Button>
                        </td>
                    </tr>
                ) : ""}
                { options?.load?.function ? (
                    <>
                    { !options.load.state ? (
                        <tr>
                            <td colSpan={get_colspan(headers, options.buttons)}>
                                <Button
                                    variant='primary'
                                    className='w-100'
                                    onClick={options.load.function}
                                >
                                    {options.load.desc.default}
                                </Button>
                            </td>
                        </tr>
                    ) : (
                        <tr>
                            <td colSpan={get_colspan(headers, options.buttons)}>
                                <Button
                                    variant='primary'
                                    className='w-100'
                                    onClick={options.load.function}
                                >
                                    {options.load.desc.loading}
                                </Button>
                            </td>
                        </tr>
                    )}
                    </>
                ) : ""}
            </tbody>
        </Table>
    )
};

export default Horizontal;