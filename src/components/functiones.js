export const get_dataid = (click) => {
    var row = click.target

    while (row.tagName !== 'TR') {
        row = row.parentElement
    }

    return row.getAttribute('data-id');
}