import React from 'react'

export const generate_prefix = (length) =>{
    var prefix;
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    
    for ( var i = 0; i < length; i++) {
        prefix += characters.charAt(Math.floor(Math.random() * length));
    }

    return prefix;
};

export const get_value = (value_key, value, space=null) => {
    if (value_key.includes('.')){
        const key = value_key.split('.')

        if (key.length == 1) {
            return value[value_key];
        } else {
            for (var i = 0; i < key.length; i++) {
                value = value[key[i]]
            }
            return value;
        }
    } else if (value_key.includes('+')) {
        const key = value_key.split('+')

        if (key.length == 1){
            return value[value_key];
        } else {
            var output = "";
            for (var i = 0; i < key.length; i++) {
                output += value[key[i]]
                if ((i + 1) < key.length) {
                    output += (space || " ");
                }
            }
            return output;
        }
    } else {
        try {
            return value[value_key];
        } catch (error) {
            console.error("Choosen variable was not found or does not exist!")
            return null
        }
    }
};

export const get_display = (display, container) => {
    var output = "";
    if (display) {
        output += "d-none d-" + display + "-"
        switch (container) {
            case 'col':
                output += "table-cell"
                break;
            case 'row':
                output += "table-row"
                break;
            default:
                output = null
                break;
        }
    }
    return output;
};

export const get_icon = (icon_array, pos=null) => {
    if (icon_array) {
        if (icon_array.icon && (icon_array.pos == pos || pos == null)) {
            return (
                <>
                {icon_array.icon}
                </>
            )
        } else {
            return null
        }
    } else {
        return null
    }
}
