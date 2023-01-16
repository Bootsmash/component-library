import React from 'react';
import { Button, Tooltip, OverlayTrigger } from 'react-bootstrap';
import { BsCommand } from 'react-icons/bs';
import { get_display, generate_prefix, has_permission } from '../functiones';

export const TableButtons = (props) => {
    const prefix = generate_prefix(4)
    var user = props.user || null

    const get_button = (btn) => {
        if (props.disable.includes(btn.label)) {
            return (
                <Button 
                    variant="link"
                    className={`text-${(btn.execute || !btn.variant) ? btn.color || '' : ''}`}
                    disabled
                >
                    {btn.icon || <BsCommand />}
                </Button>
            )
        }
        return (
            <Button 
                variant={btn.variant || 'link'} 
                className={`text-${(btn.execute || !btn.variant) ? btn.color || '' : ''}`}
                onClick={btn.execute || null}
                disabled={btn.execute ? false : true}
            >
                {btn.icon || <BsCommand />}
            </Button>
        )
    }

    const button = (btn) => {
        return (
            <td 
                name={btn.label}
                className={`${get_display(btn.display || null, 'col')} text-center align-middle`}
                key={`${prefix}-${btn.label}`}
            >
                { btn.tooltip ? (
                    <>
                    <OverlayTrigger
                        key={`${prefix}-${btn.label}-overlay`}
                        placement={btn.tooltip.pos || 'top'}
                        overlay={
                        <Tooltip id={`${prefix}-${btn.label}-tooltip`}>
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
        )
    }

    if (props.buttons) {
        var buttons = props.buttons

        if (props.ct == "thead" || props.ct == "head") {
            return (
                <>
                { buttons ? (
                    <>
                    {buttons.map((btn, i) => 
                    <th width={btn.width || 30} className={get_display(btn.display || null, 'col')}></th>
                    )}
                    </>
                ) : ""}
                </>
            )
        } else {
            return (
                <>
                { buttons ? (
                    <>
                    {buttons.map((btn, b) => 
                        <>
                        {!btn?.permissions || ( user && has_permission(user, btn.permissions)) ? (
                            <>
                            <td>
                                { button(btn) }
                            </td>
                            </>
                        ) : ""}
                        </>
                    )}
                    </>
                ) : ""}
                </>
            )
        }
    } else {
        return <></>
    }
}