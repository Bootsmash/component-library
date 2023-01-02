import React from 'react'

export const generate_prefix = (length) =>{
    let result = ' ';
    const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
};

export const get_value = (value_key, value, space=null) => {
    if (value_key.includes('.')){
        const key = value_key.split('.')

        if (key.length == 1) {
            return value[value_key];
        } else {
            for (var i = 0; i < key.length; i++) {
                try{
                    value = value[key[i]]
                } catch (err) {
                    console.error("Choosen variable was not found or does not exist!")
                    value = null
                }
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
};

export const get_colspan = (headers=null, buttons=null) => {
    var colspan = 0
    if (headers) {
        for (var i = 0; i < headers.length; i++) {
            colspan += 1
        }
    }
    if (buttons) {
        for (var i = 0; i < buttons.length; i++) {
            colspan += 1
        }
    }
    if (colspan == 0){
        colspan = 1
    }

    return colspan;
};

const get_permission = (user, permission) => {

    switch (permission) {
        case 'isSuperuser':
            if (user.is_superuser == true) {
                return true
            } else {
                return false
            }
        case 'isStaff':
            if (user.is_staff == true) {
                return true
            } else {
                return false
            }
        default:
            if (user.user_permissions.includes(permission)) {
                return true
            } else {
                return false
            }
    }
}

export const has_permission = (user, permissions) => {
    var has_permission = false

    for (var i = 0; i < permissions.length; i++) {
        if (get_permission(user, permissions[i])) {
            has_permission = true
        }
    }
    
    return has_permission    
};