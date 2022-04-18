import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { Col, Form } from 'react-bootstrap'
import { UrlLineas } from '../helpers/urls'
import { useForm } from '../hooks/useForm'
import Swal from 'sweetalert2'


const ControlLineas = () => {
    const [todasLineas, settodasLineas] = useState([])

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true)

    const [show2, setShow2] = useState(false);
    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => setShow2(true)

    const [values, handleInputChange, setValues] = useForm({
        id_linea: 0,
        activa: 'si',
        descripcion_linea: "",
        id_marca: 0,
        nombre_linea: ""
    })

    const { id_linea, activa, descripcion_linea, id_marca, nombre_linea } = values

    const getLineas = async () => {
        const res = await fetch(UrlLineas)
        const data = await res.json()
        settodasLineas(data)
    }

    const lanzarModal = (linea) => {
        handleShow2()
        setValues(linea)
    }

    const nuevaLinea = async (e) => {
        e.preventDefault()
        console.log(values);
        const res = await fetch(UrlLineas, {
            method: 'POST',
            body: JSON.stringify({
                activa,
                descripcion_linea,
                id_marca: Number(id_marca),
                nombre_linea
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if (res.status === 200) {
            getLineas()
            setValues({
                activa: 'si',
                descripcion_marca: '',
                nombre_marca: ''
            })
            await Swal.fire({
                icon: 'success',
                title: 'Linea creada',
                showConfirmButton: false,
                timer: 1500
            })
            handleClose()
        } else {
            await Swal.fire({
                icon: 'error',
                title: 'Error al crear',
                showConfirmButton: false,
                timer: 1500
            })
        }
    }

    const actualizarLinea = async (e) => {
        e.preventDefault()
        const res = await fetch(UrlLineas + id_linea, {
            method: 'PUT',
            body: JSON.stringify({
                activa,
                descripcion_linea,
                id_marca: Number(id_marca),
                nombre_linea
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if (res.status === 200) {
            await Swal.fire({
                icon: 'success',
                title: 'Linea actualizada',
                showConfirmButton: false,
                timer: 1500
            })
            handleClose2()
            getLineas()
        } else {
            await Swal.fire({
                icon: 'error',
                title: 'Error al actualizar',
                showConfirmButton: false,
                timer: 1500
            })
            handleClose2()
        }
    }

    const eliminarLinea = async (id) => {
        const res = await fetch(UrlLineas + id, {
            method: 'DELETE'
        })
        if (res.status === 200) {
            await Swal.fire({
                icon: 'success',
                title: 'Linea eliminada',
                showConfirmButton: false,
                timer: 1500
            })
            getLineas()
        } else {
            await Swal.fire({
                icon: 'error',
                title: 'Error al eliminar',
                showConfirmButton: false,
                timer: 1500
            })
        }
    }

    useEffect(() => {
        getLineas()
    }, [])


    return (
        <div>
            <div className='consultas2'>
                <span className='d-flex justify-content-between'>
                    Todas las lineas
                    <Button variant="green" className='m-2' onClick={handleShow}>Nueva Linea</Button>
                </span>
                <Table striped bordered hover variant="green">
                    <thead>
                        <tr>
                            <th>Id Linea</th>
                            <th>Estado &#40;Activa&#41;</th>
                            <th>Nombre</th>
                            <th>Id Marca</th>
                            <th>Descripcion</th>
                            <th>Accion</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            todasLineas.map((linea, index) => (
                                <tr key={index}>
                                    <td>{linea.id_linea}</td>
                                    <td>{linea.activa}</td>
                                    <td>{linea.nombre_linea}</td>
                                    <td>{linea.id_marca}</td>
                                    <td>{linea.descripcion_linea}</td>
                                    <td>
                                        <Button variant="primary" onClick={() => lanzarModal(linea)} >Editar</Button>{' '}
                                        <Button variant="danger" onClick={() => eliminarLinea(linea.id_linea)} >Eliminar</Button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>
            </div>
            {/* Crear una nueva linea */}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Nueva Linea</Modal.Title>
                </Modal.Header>
                <Form onSubmit={nuevaLinea}>
                    <Modal.Body>
                        <Form.Group as={Col} controlId="formGridState" className='mb-3'>
                            <Form.Label>Activa</Form.Label>
                            <Form.Select name='activa' value={activa} onChange={handleInputChange}>
                                <option name='activa' value="si">si</option>
                                <option name='activa' value="no">no</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control type="text" name='nombre_linea' value={nombre_linea} onChange={handleInputChange} required />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Id Marca</Form.Label>
                            <Form.Control type="number" name='id_marca' value={id_marca} onChange={handleInputChange} required />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Descripcion</Form.Label>
                            <Form.Control
                                as="textarea"
                                placeholder="Ingrese la descripcion de la linea"
                                style={{ height: '150px' }}
                                name="descripcion_linea"
                                value={descripcion_linea}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Cancelar
                        </Button>
                        <Button variant="primary" type='submit'>
                            Crear Linea
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
            <Modal show={show2} onHide={handleClose2}>
                <Modal.Header closeButton>
                    <Modal.Title>Editar Linea</Modal.Title>
                </Modal.Header>
                <Form onSubmit={actualizarLinea}>
                    <Modal.Body>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Id Linea</Form.Label>
                            <Form.Control type="text" name='id_linea' value={id_linea} onChange={handleInputChange} readOnly />
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridState" className='mb-3'>
                            <Form.Label>Activa</Form.Label>
                            <Form.Select name='activa' value={activa} onChange={handleInputChange}>
                                <option name='activa' value="si">si</option>
                                <option name='activa' value="no">no</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control type="text" name='nombre_linea' value={nombre_linea} onChange={handleInputChange} required />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Id Marca</Form.Label>
                            <Form.Control type="number" name='id_marca' value={id_marca} onChange={handleInputChange} required />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Descripcion</Form.Label>
                            <Form.Control
                                as="textarea"
                                placeholder="Ingrese la descripcion de la linea"
                                style={{ height: '150px' }}
                                name="descripcion_linea"
                                value={descripcion_linea}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose2}>
                            Cancelar
                        </Button>
                        <Button variant="primary" type='submit'>
                            Editar Linea
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </div>
    )
}

export default ControlLineas