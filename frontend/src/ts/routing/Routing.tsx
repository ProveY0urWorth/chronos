import React from 'react'
import { Navigate,Route,Routes } from 'react-router-dom'
import { routes } from './config'

function Routing(){
    return (
        <Routes>
            <Route path={routes.base}/>
            <Route path={routes.any} element={<Navigate to={routes.home} replace />} />
        </Routes>
    )
}

export default Routing