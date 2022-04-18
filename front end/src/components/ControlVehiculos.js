import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { UrlvehiculoMimMax, UrlVehiculoRangoSeguro, Urlvehiculos } from '../helpers/urls'
import { Col, Form, Row } from 'react-bootstrap'
import { useForm } from '../hooks/useForm'
import Swal from 'sweetalert2'

const ControlVehiculos = () => {
    const [todosVehiculos, settodosVehiculos] = useState([])
    const [vehiculosRango, setvehiculosRango] = useState([])
    const [modeloMinMax, setmodeloMinMax] = useState({
        fecha_inicio: "",
        fecha_fin: ""
    })

    const [values2, handleInputChange2, setValues2] = useForm(modeloMinMax)

    const { fecha_inicio, fecha_fin } = modeloMinMax

    const [values, handleInputChange, setValues] = useForm({
        placa: "",
        modelo: 0,
        fv_seguro: '',
        fv_tecnicomecanica: '',
        id_linea: 0
    })

    const { placa, modelo, fv_seguro, fv_tecnicomecanica, id_linea } = values
    const [show, setShow] = useState(false);
    const [show2, setShow2] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => setShow2(true);

    const getTodosVehiculos = async () => {
        const res = await fetch(Urlvehiculos)
        const data = await res.json()
        settodosVehiculos(data)
    }

    const lanzarModal = (vehiculo) => {
        setValues(vehiculo)
        handleShow()
    }

    const lanzarModalNuevoVehiculo = () => {
        setValues({
            placa: "",
            modelo: 0,
            fv_seguro: '',
            fv_tecnicomecanica: '',
            id_linea: 0
        })
        handleShow2()
    }

    const updateVehiculo = async () => {
        const res = await fetch(Urlvehiculos + values.placa, {
            method: 'PUT',
            body: JSON.stringify(values),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if (res.status === 200) {
            await Swal.fire({
                icon: 'success',
                title: 'Vehiculo actualizado',
                showConfirmButton: false,
                timer: 1500
            })
            handleClose()
        } else {
            await Swal.fire({
                icon: 'error',
                title: 'Error al actualizar',
                showConfirmButton: false,
                timer: 1500
            })
            handleClose()
        }
    }

    const deleteVehiculo = async (placa) => {
        Swal.fire({
            title: `¿Esta seguro de eliminar el vehiculo con placa ${placa}?`,
            text: "Esta accion no se puede revertir!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar!'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(Urlvehiculos + placa, {
                    method: 'DELETE'
                }).then(res => {
                    if (res.status === 200) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Vehiculo eliminado',
                            showConfirmButton: false,
                            timer: 1500
                        }).then(() => {
                            window.location.reload()
                        })
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Error al eliminar',
                            showConfirmButton: false,
                            timer: 1500
                        }).then(() => {
                            window.location.reload()
                        })
                    }
                })
            }
        })
    }

    const createVehiculo = async (e) => {
        e.preventDefault()
        const res = await fetch(Urlvehiculos, {
            method: 'POST',
            body: JSON.stringify({
                placa,
                modelo: Number(modelo),
                fv_seguro,
                fv_tecnicomecanica,
                id_linea: Number(id_linea)
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if (res.status === 200) {
            await Swal.fire({
                icon: 'success',
                title: 'Vehiculo creado',
                showConfirmButton: false,
                timer: 1500
            })
            handleClose2()
            window.location.reload()
        } else {
            await Swal.fire({
                icon: 'error',
                title: 'Error al crear',
                showConfirmButton: false,
                timer: 1500
            })
            handleClose2()
        }
    }

    const getModeloMinMax = async () => {
        const res = await fetch(UrlvehiculoMimMax)
        const data = await res.json()
        setmodeloMinMax(data)
    }

    const getVehiculoRangoSeguro = async (e) => {
        e.preventDefault()
        const res = await fetch(UrlVehiculoRangoSeguro, {
            method: 'POST',
            body: JSON.stringify(values2),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const data = await res.json()
        console.log(data);
        setvehiculosRango(data)
        setValues2({})
    }

    useEffect(() => {
        getTodosVehiculos()
        getModeloMinMax()
    }, [])


    return (
        <div>
            <div className='consultas'>
                <span className='d-flex justify-content-between'>
                    Todos los vehiculos
                    <Button variant="green" onClick={lanzarModalNuevoVehiculo} className='m-2'>Nuevo Vehiculo</Button>
                </span>
                <Table striped bordered hover variant="green">
                    <thead>
                        <tr>
                            <th>Placa</th>
                            <th>Modelo</th>
                            <th>Vencimiento Seguro</th>
                            <th>Vencimiento Tecnicomecanica</th>
                            <th>Id Linea</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            todosVehiculos.map((vehiculo, index) => (
                                <tr key={index}>
                                    <td>{vehiculo.placa}</td>
                                    <td>{vehiculo.modelo}</td>
                                    <td>{vehiculo.fv_seguro}</td>
                                    <td>{vehiculo.fv_tecnicomecanica}</td>
                                    <td>{vehiculo.id_linea}</td>
                                    <td>
                                        <Button variant="primary" onClick={() => lanzarModal(vehiculo)}>Editar</Button>{' '}
                                        <Button variant="danger" onClick={() => deleteVehiculo(vehiculo.placa)}>Eliminar</Button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>
            </div>
            <div className='consultas'>
                <span>Modelos</span>
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th>Modelo Maximo</th>
                            <th>Modelo Minimo</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th>{modeloMinMax.Modelo_max}</th>
                            <th>{modeloMinMax.Modelo_min}</th>
                        </tr>
                    </tbody>

                </Table>
            </div>
            <div className='consultas'>
                <span>Buscar por vencimiento del seguro</span>
                <Form onSubmit={getVehiculoRangoSeguro} className="mb-2">
                    <Row>
                        <Col>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Incio del rango</Form.Label>
                                <Form.Control type="date" name='fecha_inicio' value={fecha_inicio} onChange={handleInputChange2} required />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3" controlId="ControlInput1">
                                <Form.Label>Fin del rango</Form.Label>
                                <Form.Control type="date" name='fecha_fin' value={fecha_fin} onChange={handleInputChange2} required />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Button variant="dark" type="submit">Buscar</Button>
                </Form>
                {vehiculosRango.length > 0 &&
                    <Table striped bordered hover variant="dark">
                        <thead>
                            <tr>
                                <th>Placa</th>
                                <th>Modelo</th>
                                <th>Vencimiento Seguro</th>
                                <th>Vencimiento Tecnicomecanica</th>
                                <th>Id Linea</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                vehiculosRango.map((vehiculo, index) => (
                                    <tr key={index}>
                                        <td>{vehiculo.placa}</td>
                                        <td>{vehiculo.modelo}</td>
                                        <td>{vehiculo.fv_seguro}</td>
                                        <td>{vehiculo.fv_tecnicomecanica}</td>
                                        <td>{vehiculo.id_linea}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </Table>
                }
            </div>
            {/* Modal Actualizar Vehiculo */}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Editar vehiculo {placa}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Placa</Form.Label>
                            <Form.Control type="text" name='placa' value={placa} onChange={handleInputChange} placeholder="Placa" readOnly />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Modelo</Form.Label>
                            <Form.Control type="number" name="modelo" value={modelo} onChange={handleInputChange} placeholder="Modelo" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Vencimiento Seguro</Form.Label>
                            <Form.Control type="date" name='fv_seguro' value={fv_seguro} onChange={handleInputChange} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Vencimiento Tecnicomecanica</Form.Label>
                            <Form.Control type="date" name='fv_tecnicomecanica' value={fv_tecnicomecanica} onChange={handleInputChange} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Id Linea</Form.Label>
                            <Form.Control type="number" name='id_linea' value={id_linea} onChange={handleInputChange} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={updateVehiculo}>
                        Actualizar vehiculo
                    </Button>
                </Modal.Footer>
            </Modal>
            {/* Nuevo vehiculo */}
            <Modal show={show2} onHide={handleClose2}>
                <Modal.Header closeButton>
                    <Modal.Title>Nuevo Vehiculo</Modal.Title>
                </Modal.Header>
                <Form onSubmit={createVehiculo}>
                    <Modal.Body>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Placa</Form.Label>
                            <Form.Control type="text" name='placa' value={placa} onChange={handleInputChange} placeholder="Placa" required />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Modelo</Form.Label>
                            <Form.Control type="number" name="modelo" value={modelo} onChange={handleInputChange} placeholder="Modelo" required />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Vencimiento Seguro</Form.Label>
                            <Form.Control type="date" name='fv_seguro' value={fv_seguro} onChange={handleInputChange} required />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Vencimiento Tecnicomecanica</Form.Label>
                            <Form.Control type="date" name='fv_tecnicomecanica' value={fv_tecnicomecanica} onChange={handleInputChange} required />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Id Linea</Form.Label>
                            <Form.Control type="number" name='id_linea' value={id_linea} onChange={handleInputChange} required />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose2}>
                            Cancelar
                        </Button>
                        <Button variant="primary" type='submit'>
                            Crear vehiculo
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </div>
    )
}

export default ControlVehiculos