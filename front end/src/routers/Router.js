import React from 'react'
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom'
import ControlLineas from '../components/ControlLineas'
import ControlMarcas from '../components/ControlMarcas'
import ControlVehiculos from '../components/ControlVehiculos'
import ListarCards from '../components/ListarCards'
import NavBar from '../components/NavBar'
const Routers = () => {
    return (
        <div>
            <Router>
                <NavBar />
                <Routes>
                    <Route path="/" element={<ListarCards />} />
                    <Route path='/ctrVehiculo' element={<ControlVehiculos />} />
                    <Route path='/ctrMarca' element={<ControlMarcas />} />
                    <Route path='/ctrLinea' element={<ControlLineas />} />
                    <Route path='*' element={<Navigate to="/" />} />
                </Routes>
            </Router>
        </div>
    )
}

export default Routers