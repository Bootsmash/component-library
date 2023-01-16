import React, { useEffect, useState } from 'react';
import { Modal, Button, Form, FloatingLabel } from 'react-bootstrap';
import { format_input } from '../../FormatProvider/format';
import { get_value, VarText } from '..';

export const ModalDelete = ({show, handleClose, onDelete, title, body, object}) => {
    if (!object)
        return ""

    return (
        <>
        {object ? (
            <>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop='static'
                keyboard={false}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        <VarText data={object}>
                            {title || "Objekt aus Datenbank löschen?"}
                        </VarText>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <VarText data={object}>
                        {body || "Der Lösch Vorgang kann nicht wieder rückgängig gemacht werden! Falls es untergeordnete Objekte gibt, werden diese ebenfalls gelöscht!"}
                    </VarText>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        Abbrechen
                    </Button>
                    <Button variant='outline-danger' onClick={onDelete}>
                        Löschen
                    </Button>
                </Modal.Footer>
            </Modal>
            </>
        ) : ""}
        </>
    )
}

const set_values = (fields, type) => {
    var tmp = {}

    for (var i = 0; i < fields.length; i++) {
        if ((fields[i].edit && type == "edit") || fields[i].create && type == "create") {
            switch (fields[i].type) {
                case 'checkbox':
                case 'switch':
                    tmp[fields[i].value] = document.getElementById(fields[i].value).checked
                    break;
                default:
                    tmp[fields[i].value] = document.getElementById(fields[i].value).value
                    break;
            }
        }
    }
    return tmp
}

const Field = ({label, type, value, name, disabled, hidden, required}) => {
    const [newValue, setValue] = useState()
    const [checked, setChecked] = useState()

    useEffect(() => {
        switch (type) {
            case 'checkbox':
            case 'switch':
                setChecked(value)
                break;
            default:
                setValue(value)
                break;
        }
    }, [value])

    const onChange = e => {
        switch(type) {
            case 'checkbox':
            case 'switch':
                setChecked(e.target.checked)
                break;
            default:
                setValue(e.target.value)
                break;
        }
    }

    return (
        <>
        { type == "switch" || type == "checkbox" ? (
            <Form.Check 
                type={type}
                id={name}
                name={name}
                label={label}
                checked={checked || false}
                onChange={onChange}
                disabled={disabled || false}
                hidden={hidden || false}
            />
        ) : (
            <FloatingLabel className='mb-3 mt-3'>
                <Form.Control 
                    value={newValue}
                    onChange={onChange}
                    type={type || "text"}
                    id={name}
                    name={name}
                    disabled={disabled || false}
                    hidden={hidden || false}
                    placeholder={label}
                    required={required || false}
                />
                <Form.Label hidden={hidden || false}>{label}</Form.Label>
            </FloatingLabel>
        )}
        </>
    )
}

export const ModalEdit = ({show, handleClose, onEdit, title, object, fields}) => {

    const onSubmit = e => {
        e.preventDefault()

        onEdit(set_values(fields, "edit"))
    }

    return (
        <>
        { object ? (
            <>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop='static'
                keyboard={false}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        <VarText data={object}>
                            {title || "Objekt aus Datenbank löschen?"}
                        </VarText>
                    </Modal.Title>
                </Modal.Header>
                <Form onSubmit={onSubmit}>
                    <Modal.Body>
                        <>
                        {fields && object ? (
                            <>
                            {fields.map((field, f) =>
                                <>
                                {field.edit ? (
                                    <Field 
                                        label={field.label}
                                        type={field.type}
                                        value={get_value(field.value, object)}
                                        name={field.value}
                                        disabled={field.disabled}
                                        hidden={field.hidden}
                                        required={field.required}
                                    />
                                ) : ""}
                                </>
                            )}
                            </>
                        ) : ""}
                        </>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="outline-primary" onClick={handleClose}>
                            Abbrechen
                        </Button>
                        <Button variant='success' type="submit">
                            Speichern
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
            </>
        ) : ""}
        </>
    )
}

export const ModalCreate = ({show, handleClose, onCreate, title, fields}) => {

    const onSubmit = e => {
        e.preventDefault()
     
        onCreate(set_values(fields, "create"))
    }

    return (
        <>
        <Modal
            show={show}
            onHide={handleClose}
            backdrop='static'
            keyboard={false}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    {title}
                </Modal.Title>
            </Modal.Header>
            <Form onSubmit={onSubmit}>
                <Modal.Body>
                    <>
                    {fields ? (
                        <>
                        {fields.map((field, f) =>
                            <>
                            { field.create ? (
                                <Field 
                                    label={field.label}
                                    type={field.type}
                                    name={field.value}
                                    required={field.required}
                                />
                            ) : ""}
                            </>
                        )}
                        </>
                    ) : ""}
                    </>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-primary" onClick={handleClose}>
                        Abbrechen
                    </Button>
                    <Button variant='success' type="submit">
                        Speichern
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
        </>
    )
}