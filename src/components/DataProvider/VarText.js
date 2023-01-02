import React, { useEffect } from 'react';
import { format_input } from '../FormatProvider/format';
import { get_value, generate_prefix } from './functiones';

const set_var = (data, div_id, tag=null) => {
    let div = document.getElementById(div_id)
    let vars = div.getElementsByTagName(tag || "d-var");

    var value;
    var format;
    var fixes;
    var suffix;
    var formatted;
    
    for (let i = 0; i < vars.length; i++){
        if (vars[i].getAttribute('done') != "true") {
            value = get_value(vars[i].getAttribute('value'), data, vars[i].getAttribute('space') || null)
            
            format = vars[i].getAttribute('format') || 'none'
            fixes = vars[i].getAttribute('fixes') || null
            suffix = vars[i].getAttribute('suffix') || null

            formatted = format_input(format, value, fixes, suffix)

            if (React.isValidElement(formatted)){
                var none = vars[i].getAttribute('none') || null
                if (none) {
                    formatted = format_input(format, none, fixes, suffix)
                } else {
                    formatted = ""
                }
            }

            vars[i].innerHTML = formatted
            vars[i].setAttribute('done', "true")
        }
    }
}

export const VarText = (props) => {
    var data = props['data']
    var content = props.children

    var id = generate_prefix(5);

    var format = props.format || null

    useEffect(() => {
        set_var(data, id, format=format)
    }, [])

    return (
        <>
        <div id={id}>
            { content }
        </div>
        </>
    )
}