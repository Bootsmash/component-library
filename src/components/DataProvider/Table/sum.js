export const get_sum = (data, header) => {
    var output = 0;

    switch (header.sum) {
        case 'sum':
            for (var i = 0; i < data.length; i++) {
                output += data[header.value] || 0
            }
            break;
        case 'count':
            for (var i = 0; i < data.length; i++) {
                output += 1
            }
            break;
        default:
            output = "Error: No function founded"
            break;
    }

    return output
}

export const get_format = (header) => {
    switch (header.format) {
        case 'meter':
        case 'squaremeter':
        case 'cubikmeter':
        case 'kwh':
        case 'liter':
        case 'price':
        case 'number':
        case 'round':
            return header.format
        default:
            return 'round'
    }
}