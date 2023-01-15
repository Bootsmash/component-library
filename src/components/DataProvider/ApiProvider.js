import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Form, Modal } from 'react-bootstrap';
import { DataProvider, VarText } from './'
import useDebounce from '../../hooks/use-debounce';
import './provider.css'
import { BsTrash } from 'react-icons/bs';
import { get_dataid } from '../functiones';

const ModalDelete = ({show, handleClose, onDelete, delete_header, delete_body, object}) => {

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
                        {delete_header || "Objekt aus Datenbank löschen?"}
                    </VarText>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <VarText data={object}>
                    {delete_body || "Der Lösch Vorgang kann nicht wieder rückgängig gemacht werden! Falls es untergeordnete Objekte gibt, werden diese ebenfalls gelöscht!"}
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


export const APIProvider = (props) => {
    var api = props.options.api

    var raw_url = api.url || null
    var url = api.url + "?" || null
    const access_token = api.access
    const searching = props.search || null
    const pagesize = api.items || 5

    const [objects, setObjects] = useState()
    const [gesObjects, setGesObjects] = useState(0)
    const [currentObjects, setCurrentObject] = useState(0)
    const [page, setPage] = useState(1)
    const [search, setSearch] = useState()

    const [object_id, setObjectID] = useState()
    const [objectData, setObjectData] = useState()

    const [loading, setLoading] = useState(true)
    const [stateLoading, setStateLoading] = useState(false)
    const [caption, setCaption] = useState("")

    const debounce = useDebounce(search, 500)

    const [showDelete, setShowDelete] = useState(false);

    const handleCloseDelete = () => setShowDelete(false);

    const onAdd = () => {
        console.log("test")
    }

    const handleShowDelete = async e => {
        await setObjectID(get_dataid(e))
        await getObjectData(get_dataid(e))
        setShowDelete(true)
    }

    const onLoad = () => {
        setPage(page + 1)
    }

    if (props.add) {
        props.options.add = {
            label: (props.add.label || ""),
            execute: onAdd
        }
    }

    if (api.delete) {
        props.options.buttons = [
            {label: "delete", icon: <BsTrash />, execute: handleShowDelete}
        ] 
    }

    if (props.loadMore) {
        props.options.load = {
            label: (props.loadMore.label || ""),
            execute: onLoad,
            loading: loading,
            hidden: !stateLoading,
        }
    }

    const onDelete = async e => {
        if (object_id) {
            try {
                await axios.delete(raw_url + object_id, {
                    headers: {
                        Accept: 'application/json',
                        Authorization: `Bearer ${access_token}`,
                    }
                })
                getObjects(1, page * pagesize)
                setShowDelete(false)

            } catch (err) {
                console.error(err.message)
            }
        }
    }

    const getObjectData = async (object_identification) => {
        try {
            const res = await axios.get(raw_url + object_identification, {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${access_token}`,
                }
            })
            
            setObjectData(res.data)
        } catch (err) {
            console.log(err.message)
        }
    }
        
    const getObjects = async (page_number, page_size) => {
        url = raw_url + `?page=${page_number || page}&page_size=${page_size || pagesize || '10'}&ordering=${api.order || ''}&`
        if (search) {
            url += `search=${search}&`
        }
        
        try {
            setLoading(true)
            const res = await axios.get(url, {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${access_token}`,
                }
            })

            if (api?.page === "tab") {
                setObjects(res.data.results)
                setCurrentObject(res.data.results.length)
            } else {
                if (page > 1 && (page_number > 1 || page_number == null)) {
                    let array = [...objects]
                    for (let i = 0; i < res.data.results.length; i++){
                        array = await ([...array, res.data.results[i]])
                    }
                    setObjects(array)
                    let count = currentObjects + res.data.results.length
                    if (page)
                        setCurrentObject(count)
                } else {
                    if (!page_number && !page_size)
                        setCurrentObject(res.data.results.length)
                    setObjects(res.data.results)
                }

                if (res.data.next) {
                    setStateLoading(true)
                } else {
                    setStateLoading(false)
                }
            }
            if (!page_number && !page_size)
                setGesObjects(res.data.count)
        
            setLoading(false)

        } catch (err) {
            setLoading(false)
            console.error(err.message)
        }
    }

    useEffect(() => {
        if (api.refresh || api.refresh >= 1) {
            const intervall = setInterval(() => {
                getObjects(1, page * pagesize)
            }, (api.refresh * 1000))

            return () => clearInterval(intervall);
        }
    }, [page, pagesize])

    // API request if search param given
    useEffect(() => {
        setPage(1)
        if (search) {
            setStateLoading(false)
        } else {
            setStateLoading(true)
        }
        getObjects()
    }, [debounce])

    // API request if page changed
    useEffect(() => {
        getObjects()
    }, [page])

    // Inital API request
    useEffect(() => {
        getObjects()
        setCaption("0 / 0")
    }, [])


    // set caption
    useEffect(() => {
        setCaption(currentObjects + " / " + gesObjects)
    }, [currentObjects, gesObjects, search])

    return (
        <>
        { api.search ? (
            <Form.Control 
                type="text"
                className={`searchbar my-2 ${api.search?.pos ? api.search.pos == "center" ? 'mx-auto' : api.search.pos == "end" ? 'ms-auto' : 'mr-auto' : 'mr-auto'}`}
                placeholder={api.search?.label || "Suche"}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
        ) : ""}
        <DataProvider 
            value={objects}
            variant={props.variant}
            options={props.options}
            caption={caption}
        />
        { api?.delete ? (
            <ModalDelete 
                show={showDelete}
                handleClose={handleCloseDelete}
                onDelete={onDelete}
                delete_header={api.delete.title || null}
                delete_body={api.delete.desc || null}
                object={objectData}
            />
        ) : ""}
        </>
    )
}