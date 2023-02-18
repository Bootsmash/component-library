import React from 'react';
import { Table, Button, Spinner } from 'react-bootstrap';
import { generate_prefix, get_value, get_display, get_icon, get_colspan, has_permission } from '../functiones';
import { get_sum, get_format } from './sum';
import { FormatProvider } from '../../FormatProvider/index';
import { TableButtons } from './buttons';
import { BsPlusLg } from 'react-icons/bs';
import { default as TableVertical } from './vertical';
import { get_dataid } from '../../functiones';

export const get_highlights = (options, item, type, label=null) => {
    if (options?.highlight && type == "highlight") {
        let highlight = options.highlight
        for (var h = 0; h < highlight.length; h++) {
            if (highlight[h].values.includes(get_value((highlight[h].key || options.unique), item))) {
                return (highlight[h].class || "")
            }
            return false
        }
    } else if (options?.disable && type == "disable" && label) {
        let disable = options.disable
        for (var d = 0; d < options.disable.length; d++) {
            let disable = options.disable[d]
            if (disable?.buttons.includes(label)) {
                if (disable.values.includes(get_value((disable.key || options.unique), item))) {
                    return true
                }
            }
            return false
        }
    } else {
        return false
    }
}

const onExpandSubtable = e => {
    var identifier = get_dataid(e)
    var row = document.getElementById('subtable-' + identifier)

    if (row.classList.contains('d-none')) {
        row.classList.remove('d-none')
        row.classList.add('d-table-row')
    } else {
        row.classList.add('d-none')
        row.classList.remove('d-table-row')
    }
}


const Horizontal = (props) => {

    var data = props.children;
    const headers = props['headers'];
    var options = props['options'] || [];
    var user = props.user || null;

    const head_prefix = generate_prefix(4)
    const body_prefix = generate_prefix(4)


    var caption = options.caption || props['caption'] || null

    if (options?.subtable && options?.subtable?.button) {
        options.subtable.button['execute'] = onExpandSubtable
        options.buttons[options.buttons.length] = options.subtable.button
    }

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
                            size={head.size} 
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
                { data ? (
                    <>
                    { data.map((item, d) =>
                        <>
                        <tr 
                            key={`${body_prefix}-${item[0]}`}
                            data-id={ options?.unique ? get_value(options.unique, item) : "" }
                            className={get_highlights(options, item, "highlight")}
                        >
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
                                    bool={head.bool || null}
                                    width={head.width}
                                    img_size={head.format == 'image' ? head.size : null}
                                />
                                </>
                            )}
                            { options && options.buttons ? (
                                <TableButtons 
                                    buttons={options.buttons}
                                    ct="tbody"
                                    user={user|| null}
                                    options={props.options}
                                    item={item}
                                />
                            ) : ""}
                        </tr>
                        { options?.subtable && options?.unique ? (
                            <tr id={"subtable-" + get_value(options.unique, item)} className="d-none">
                                <td colSpan={get_colspan(headers, options.buttons)}>
                                    <TableVertical headers={options?.subtable.headers} options={options?.subtable.options || null}>{item}</TableVertical>
                                </td>
                            </tr>
                        ) : ""}
                        </>
                    )}
                    </>
                ) : ""}
                
                { options?.sum ? (
                    <>
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
                                        suffix={head.suffix || null}
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
                    </>
                ) : ""}
                <>
                { options?.create ? (
                    <>
                    <tr>
                        <td colSpan={get_colspan(headers, options.buttons)}>
                            <Button 
                                variant='success'
                                className='w-100'
                                onClick={options.create.execute}
                                disabled={options.create.execute ? false : true}
                            >
                                <BsPlusLg /> {options.create.label}
                            </Button>
                        </td>
                    </tr>
                    </>
                ) : ""}
                </>
                {data ? (
                    <LoadMore options={options}/>
                ) : ""}
            </tbody>
        </Table>
    )
};

export default Horizontal;


const LoadMore = ({options}) => {
    if (!options?.load)
        return ""

    return (
        <>
        { options?.load?.execute && !options?.load?.hidden ? (
            <>
            { !options.load.loading ? (
                <tr>
                    <td colSpan={get_colspan(options?.headers, options.buttons)}>
                        <Button
                            variant='primary'
                            className='w-100'
                            onClick={options.load.execute}
                        >
                            {options.load.label}
                        </Button>
                    </td>
                </tr>
            ) : (
                <tr>
                    <td colSpan={get_colspan(options?.headers, 100)}>
                        <Button
                            variant='primary'
                            className='w-100'
                            disabled
                        >
                            <Spinner animation="border" size="sm"/> {options.load.label}
                        </Button>
                    </td>
                </tr>
            )}
            </>
        ) : ""}
        </>
    )
}