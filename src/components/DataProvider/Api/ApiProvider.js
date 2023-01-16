import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form } from 'react-bootstrap';
import { DataProvider } from '../'
import useDebounce from '../../../hooks/use-debounce';
import './provider.css'
import { BsPencilSquare, BsTrash } from 'react-icons/bs';
import { get_dataid } from '../../functiones';
import { ModalCreate, ModalDelete, ModalEdit } from './ApiModals';

export const APIProvider = (props) => {
    var api = props.options.api

    var raw_url = api.url || null
    var url = api.url + "?" || null
    var access_token = api.access
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
    const [showEdit, setShowEdit] = useState(false);
    const [showCreate, setShowCreate] = useState(false);

    const headers = { 
        'Accept': 'application/json',
        'Authorization': `Bearer ${access_token}`,
        'Content-Type': 'application/json'
    };

    const handleShowDelete = async e => {
        let objid = get_dataid(e)
        await setObjectID(objid)
        await getObjectData(objid)
        setShowDelete(true)
    }

    const handleShowEdit = async e => {
        let objid = get_dataid(e)
        await setObjectID(objid)
        await getObjectData(objid)
        setShowEdit(true)
    }

    const handleShowCreate = () => {
        setShowCreate(true)
    }

    const onLoad = () => {
        setPage(page + 1)
    }

    props.options.buttons = []

    if (api?.edit) {
        props.options.buttons[props.options.buttons.length] = 
        {
            label: "edit",
            icon: <BsPencilSquare />,
            execute: handleShowEdit
        }
    }

    if (api?.delete) {
        props.options.buttons[props.options.buttons.length] = 
        {
            label: "delete",
            icon: <BsTrash />,
            execute: handleShowDelete
        }
    }

    if (api?.loadMore) {
        props.options.load = {
            label: (api.loadMore.label || ""),
            execute: onLoad,
            loading: loading,
            hidden: !stateLoading,
        }
    } else {
        props.options.load = false
    }

    if (api?.create) {
        props.options.create = {
            label: (api.create || ""),
            execute: handleShowCreate,
        }
    } else {
        props.options.create = false
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

    const onEdit = async (editFormData) => {
        try {
            const body = editFormData

            const res = await axios.put(raw_url + object_id + "/", body, {headers})
            setShowEdit(false)
            getObjects(1, page * pagesize)
        } catch (err) {
            console.log(err)
        }
    }

    const onCreate = async (createFormData) => {
        try {
            const body = createFormData

            const res = await axios.post(raw_url, body, {headers})
            if (res.status == 201) {
                setShowCreate(false)
                getObjects()
            } else {
                console.error(res)
            }
        } catch (err) {
            console.log(err)
        }
    }

    const getObjectData = async (object_identification) => {
        try {
            const res = await axios.get(raw_url + object_identification + "/", {headers})
            
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
            const res = await axios.get(url, {headers})

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
                    setCurrentObject(count)
                } else {
                    setCurrentObject(res.data.results.length)
                    setObjects(res.data.results)
                }

                if (res.data.next) {
                    setStateLoading(true)
                } else {
                    setStateLoading(false)
                }
            }
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
    }, [page, pagesize, search])

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
    }, [currentObjects, gesObjects])

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
        {objects ? (
            <>
            <DataProvider 
                value={objects}
                variant={props.variant}
                options={props.options}
                caption={caption}
            />
            </>
        ) :""}
        { api?.delete ? (
            <ModalDelete 
                show={showDelete}
                handleClose={() => setShowDelete(false)}
                onDelete={onDelete}
                title={api.delete.title || null}
                body={api.delete.desc || null}
                object={objectData}
            />
        ) : ""}
        { api?.edit && api?.edit ? (
            <ModalEdit
                show={showEdit}
                handleClose={() => setShowEdit(false)}
                onEdit={onEdit}
                title={api.edit || ""}
                object={objectData}
                fields={api.fields}
            />
        ) : ""}
        { api?.create && api.fields ? (
            <ModalCreate
                show={showCreate}
                handleClose={() => setShowCreate(false)}
                onCreate={onCreate}
                title={api.create || ""}
                fields={api.fields}
            />
        ) : ""}
        </>
    )
}
