import React from 'react';
import { format_input } from './format';
import { Container } from './container';

export const FormatProvider = (props) => {

    // set input and format const
    const format = props['format'] || "none"
    const data = props['value'] || props.children || null
    const formatted = format_input(format, data, props['fixes'] || null, props['suffix'] || null, props['bool'] || null)

    // initialize Variables
    var container = props['ct'] || ""
    var title = props['title'] || ""
    var position = props['pos'] || ""
    var colspan = props['colspan'] || 1
    var display = props['display'] || null

    return (
        <>
        <Container ct={container} title={title} pos={position} colspan={colspan} display={display} width={props.width || null} >
            {formatted}
        </Container>
        </>
    )
};