import React, { useEffect, useState } from 'react'
import AuthProvider from '../../firebase/authProvider'
import { getAllAdmins } from '../../firebase/CRUD/crudAdmin'
import { TableItemt } from './table-item'
import '../../styles/itemTable/item.css'

export function Admins () {
  // hooks
  const [admins, setAdmins] = useState([])
  AuthProvider()

  // funcion para mostrar todos los docs
  async function getAdmins () {
    setAdmins(await getAllAdmins())
  }

  // usamos useEffect
  useEffect(() => {
    getAdmins()
  }, [])

  return (
        <React.Fragment>
                    <div className='container'>
            <div className='row'>
                <div className='col'>

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
                        {admins.map(admin => (
                            <TableItemt
                            key={admin.id}
                            id={admin.id}
                            nombre={admin.nombre}
                            apellido={admin.apellido}
                            email={admin.email}
                            rol={'Admin'}
                            />
                        ))}

                    </tbody>

                    </table>
                </div>
            </div>
            </div>
            <br />
            <br />
            <br />
            <br />
        </React.Fragment>
  )
}
