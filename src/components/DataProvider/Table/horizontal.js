import React from 'react';
import { Table, Button } from 'react-bootstrap';
import { generate_prefix, get_value, get_display, get_icon } from '../functiones';
import { FormatProvider } from '../../FormatProvider/index';
import { TableButtons } from './buttons';
import { BsPlusLg } from 'react-icons/bs';

const Horizontal = (props) => {

    var data = props.children;
    const headers = props['headers'];
    var options = props['options'] || [];

    const head_prefix = generate_prefix(4)
    const body_prefix = generate_prefix(4)

    var caption = options.caption || null

    return (
        <Table hover variant={options.variant} className={`align-middle table-${options.bg || ''} text-${options.bg == 'dark' ? options.color || 'light' : 'dark'}`} size={options.size || 'lg'}>
            { caption ? (
                <caption>{caption}</caption>
            ) : ""}
            <thead>
                <tr>
                    { headers.map((head, h) =>
                        <>
                        <th key={`${head_prefix}-${head.name}`} 
                            className={`text-${head['pos'] || 'start'} ${get_display(head.display || null, 'col')} align-middle`}
                        >   
                            {get_icon(head.icon || null, 'start')} {head.name} {get_icon(head.icon || null, 'end')}
                        </th>
                        </>
                    )}
                    <TableButtons buttons={options.buttons || null} ct="thead"/>
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
                                colspan={head.colspan}
                                display={head.display || null}
                                fixes={head.fixes || null}
                            />
                            </>
                        )}
                        { options && options.buttons ? (
                            <TableButtons buttons={options.buttons} ct="tbody"/>
                        ) : ""}
                    </tr>
                    </>
                )}
                { options.add ? (
                    <tr>
                        <td colSpan={headers.length + options.buttons.length}>
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
                { options.load ? (
                    <>
                    { !options.load.state ? (
                        <tr>
                            <td colSpan={headers.length + options.buttons.length}>
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
                            <td colSpan={headers.length + options.buttons.length}>
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