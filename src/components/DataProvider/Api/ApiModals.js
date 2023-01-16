import React, { useEffect, useState } from 'react';
import { Modal, Button, Form, FloatingLabel } from 'react-bootstrap';
import { format_input } from '../../FormatProvider/format';
import { get_value, VarText } from '..';

export const ModalDelete = ({show, handleClose, onDelete, title, body, object}) => {
    if (!object)
        return ""

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
    )
}

const Field = ({label, type, value, name, disabled, hidden, required}) => {
    const [newValue, setValue] = useState()

    useEffect(() => {
        setValue(value)
    }, [value])

    return (
        <>          
        <FloatingLabel className='mb-3'>
            <Form.Control 
                value={newValue}
                onChange={e => setValue(e.target.value)}
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
        </>
    )
}

export const ModalEdit = ({show, handleClose, onEdit, title, object, fields}) => {

    const onSubmit = e => {
        e.preventDefault()

        var tmp = {}

        for (var i = 0; i < fields.length; i++) {
            tmp[fields[i].value] = document.getElementById(fields[i].value).value
        }
        
        onEdit(tmp)
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

        var tmp = {}

        for (var i = 0; i < fields.length; i++) {
            if (fields[i].create) {
                tmp[fields[i].value] = document.getElementById(fields[i].value).value
            }
        }
        
        onCreate(tmp)
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