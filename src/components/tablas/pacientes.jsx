import React, { useState, useEffect } from 'react'
import { getAllPatients } from '../../firebase/CRUD/crudPacientes'
import { TableItemtPatient } from './table-item-patient'
import '../../styles/itemTable/item.css'
import '../../styles/dashBoard/dashboard.css'

const Pacientes = () => {
// hooks
  const [pacientes, setPacientes] = useState([])
  // AuthProvider()

  // funcion para mostrar todos los docs
  async function getPatients () {
    setPacientes(await getAllPatients())
  }

  // usamos useEffect
  useEffect(() => {
    getPatients()
  }, [])

  // devolvemos vista de nuestro documento

  return (
    <>
    <div className='container'>
      <div className='row'>
        <div className='col'>
          <div className="table-wrapper-scroll-y my-custom-scrollbar">
            <table className='table my-table table-hover'>
            <thead>
                <tr>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Correo</th>
                <th>Status</th>
                <th>Acciones</th>
                </tr>
            </thead>

            <tbody>
                { pacientes.map((paciente) => (
                    <TableItemtPatient
                    key={paciente.id}
                    id={paciente.id}
                    nombre={paciente.nombre}
                    apellido={paciente.apellido}
                    email={paciente.email}
                    status={paciente.status}
                    />
                ))}
            </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <br />
    <br />
    <br />
    <br />
    </>

  )
}

export default Pacientes
