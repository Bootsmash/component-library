import React from 'react';
import { Button, Tooltip, OverlayTrigger } from 'react-bootstrap';
import { BsCommand } from 'react-icons/bs';
import { get_display, generate_prefix } from '../functiones';

export const TableButtons = (props) => {
    const prefix = generate_prefix(4)

    const get_button = (btn) => {
        return (
            <Button 
                variant={btn.variant || 'link'} 
                className={`text-${(btn.function || !btn.variant) ? btn.color || '' : ''}`}
                onClick={btn.function || null}
                disabled={btn.function ? false : true}
                >
                {btn.icon || <BsCommand />}
            </Button>
        )
    }

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
                    <td 
                        name={btn.name}
                        className={`${get_display(btn.display || null, 'col')} text-center align-middle`}
                        key={`${prefix}-${btn.name}`}
                    >
                        { btn.tooltip ? (
                            <>
                            <OverlayTrigger
                                key={`${prefix}-${btn.name}-overlay`}
                                placement={btn.tooltip.pos || 'top'}
                                overlay={
                                <Tooltip id={`${prefix}-${btn.name}-tooltip`}>
                                    {btn.tooltip.desc || ""}
                                </Tooltip>
                                }
                            >
                                { get_button(btn) }
                            </OverlayTrigger>
                            </>
                        ) : (
                            <>
                            { get_button(btn) }
                            </>
                        )}
                    </td>
                )}
                </>
            )
        }
    } else {
        return <></>
    }
}