import React, { useEffect, useState } from 'react'
import AuthProvider from '../../firebase/authProvider'
import { getAllDoctors } from '../../firebase/CRUD/crudMedicos'
import { TableItemt } from './table-item'
import '../../styles/itemTable/item.css'
import '../../styles/dashBoard/dashboard.css'

export function Medicos (props) {
  // hooks
  const [medicos, setMedicos] = useState([])
  AuthProvider()

  // funcion para mostrar todos los docs
  async function getMedicos () {
    setMedicos(await getAllDoctors())
  }

  // usamos useEffect
  useEffect(() => {
    getMedicos()
  }, [])

  return (
        <React.Fragment>
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
                        <th>Acciones</th>
                        </tr>
                    </thead>

                    <tbody>
                        { medicos.map((medico) => (
                            <TableItemt
                            key={medico.id}
                            id={medico.id}
                            nombre={medico.nombre}
                            apellido={medico.apellido}
                            email={medico.email}
                            rol={'Medico'}
                            />
                        ))}

                    </tbody>

                    </table>
                    </div>
                </div>
            </div>
            </div>

        </React.Fragment>
  )
}
