import React from 'react'

export const Container = (props) => {

    const input = props['value'] || props.children
    var output;

    // Initialize Variables
    var container = props['ct'] || ""
    var position = props['pos'] || ""
    var colspan = props['colspan'] || 1
    const display = props['display'] || null
    var text = props['text'] || "dark"

    const get_display = () => {
        var output = "";
        if (display) {
            output += "d-none d-" + display + "-"
            switch (container) {
                case 'col-th':
                case 'col':
                case 'col-td':
                    output += "table-cell"
                    break;
                case 'row':
                    output += "table-row"
                    break;
                case 'none':
                default:
                    output = null
                    break;
            }
        }
        return output;
    }

    switch (container) {
        case 'col':
        case 'col-td':
            output = (
                <td 
                    className={`text-${position ? position : "end"} ${get_display()} align-middle`} 
                    colSpan={colspan} 
                >
                    {input}
                </td>
            )
            break;
        case 'col-th':
            output = (
                <th 
                    className={`text-${position ? position : "end"} ${get_display()} align-middle`} 
                    colSpan={colspan} 
                >
                    {input}
                </th>
            )
            break;
        case 'p':
            output = (
                <p className={`text-${position ? position : "start"} text-${text}`}>{input}</p>
            )
            break;
        case 'small':
            output = (
                <small className={`text-${position ? position : "start"} text-${text}`}>{input}</small>
            )
            break;
        default:
            output = input;
            break;
    }

    return (
        <>{ output }</>
    )
}