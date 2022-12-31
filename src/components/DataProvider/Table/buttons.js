import React from 'react';
import { Button } from 'react-bootstrap';
import { get_display } from '../functiones';

export const TableButtons = (props) => {
    if (props.buttons) {
        const buttons = props.buttons

        if (props.ct == "thead" || props.ct == "head") {
            return (
                <>
                {buttons.map((btn, i) => 
                    <th width={btn.width || 30} className={get_display(btn.display || null, 'col')}></th>
                )}
                </>
            )
        } else {
            return (
                <>
                {buttons.map((btn, b) => 
                    <td name={btn.name} className={`${get_display(btn.display || null, 'col')} text-center align-middle`}>
                        <Button 
                            variant={btn.variant || 'link'} 
                            className={`text-${(btn.function || !btn.variant) ? btn.color || '' : ''}`}
                            onClick={btn.function || null}
                            disabled={btn.function ? false : true}
                        >
                            {btn.icon || 'X'}
                        </Button>
                    </td>
                )}
                </>
            )
        }
    } else {
        return <></>
    }
}