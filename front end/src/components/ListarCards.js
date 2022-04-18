import React, { useState, useEffect } from 'react'
import Table from 'react-bootstrap/Table'
import { consultaUnica, UrlLineasActivas, UrlPromedioModelos, UrlSumaModelos, UrlVehiculoLineaActiva } from '../helpers/urls'

const ListarCards = () => {

    const [vehiculoConsulUni, setvehiculoConsulUni] = useState([])
    const [vehiculoLineaActiva, setvehiculoLineaActiva] = useState([])
    const [lineasActivas, setlineasActivas] = useState({})
    const [sumaModelos, setSumaModelos] = useState(0)
    const [promedioModelos, setPromedioModelos] = useState(0)

    const getVehiculosConsulUni = async () => {
        const res = await fetch(consultaUnica)
        const data = await res.json()
        setvehiculoConsulUni(data)
    }

    const getVehiculosLineaActiva = async () => {
        const res = await fetch(UrlVehiculoLineaActiva)
        const data = await res.json()
        setvehiculoLineaActiva(data)
    }

    const getLineasActivas = async () => {
        const res = await fetch(UrlLineasActivas)
        const data = await res.json()
        setlineasActivas(data)
    }

    const getSumaModelos = async () => {
        const res = await fetch(UrlSumaModelos)
        const data = await res.json()
        setSumaModelos(data)
    }

    const getPromedioModelos = async () => {
        const res = await fetch(UrlPromedioModelos)
        const data = await res.json()
        setPromedioModelos(data)
    }

    useEffect(() => {
        getVehiculosConsulUni()
        getVehiculosLineaActiva()
        getLineasActivas()
        getSumaModelos()
        getPromedioModelos()
    }, [])

    return (
        <div>
            <div className='consultas'>
                <span>Todos los vehiculos consulta unica</span>
                <Table striped bordered hover variant="green">
                    <thead>
                        <tr>
                            <th>Placa</th>
                            <th>Modelo</th>
                            <th>Descripcion Linea</th>
                            <th>Descripcion Marca</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            vehiculoConsulUni?.map((vehiculo, index) => (
                                <tr key={index}>
                                    <td>{vehiculo.placa}</td>
                                    <td>{vehiculo.modelo}</td>
                                    <td>{vehiculo.descripcion_linea}</td>
                                    <td>{vehiculo.descripcion_marca}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>
            </div>
            <div className='consultas'>
                <span>Vehiculos con linea activa</span>
                <Table striped bordered hover variant="green">
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
                            vehiculoLineaActiva?.map((vehiculo, index) => (
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
            </div>
            <div className='consultas'>
                <span>Cantidad de lineas activas e inactivas</span>
                <Table striped bordered hover variant="green">
                    <thead>
                        <tr>
                            <th>Lineas activas</th>
                            <th>Lineas inactivas</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{lineasActivas.activa}</td>
                            <td>{lineasActivas.inactiva}</td>
                        </tr>
                    </tbody>
                </Table>
            </div>
            <div className='consultas'>
                <span>Suma de modelos</span>
                <Table striped bordered hover variant="green">
                    <thead>
                        <tr>
                            <th>Suma de modelos</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{sumaModelos}</td>
                        </tr>
                    </tbody>
                </Table>
            </div>
            <div className='consultas'>
                <span>Promedio de modelos</span>
                <Table striped bordered hover variant="green">
                    <thead>
                        <tr>
                            <th>Promedio de modelos</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{promedioModelos}</td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        </div>
    )
}

export default ListarCards