import React from 'react'
import { MenuDashboardPaciente } from './menuDashboardPaciente'
import '../../styles/dashBoardPaciente/dashboard/dashboardInner.css'

export function HistoriasC() {
  return (
    <React.Fragment>
      <div className='row'>
        <div className='col-2'>
          <MenuDashboardPaciente />
        </div>
        <div className='col-10'>
          <div className='interior-dashboard'>
            <h2>Historia Clinica</h2>
            <p>Aqui iran las historias clinicas</p>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}
