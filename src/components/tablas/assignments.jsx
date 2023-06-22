import React, { useState, useEffect } from 'react'

import { getAllAssignments } from '../../firebase/CRUD/crudAsginacion'
import { TableItemAssignment } from './table-item-assignment'

export function Assignments () {
  const [assignments, setAssignments] = useState([])

  // funcion para mostrar todos los docs
  async function getAssignments () {
    setAssignments(await getAllAssignments())
  }

  useEffect(() => {
    getAssignments()
  }, [])
  return (
        <React.Fragment>
            <div className="table-wrapper-scroll-y my-custom-scrollbar">
                <table className='table my-table table-hover'>
                <thead>
                    <tr>
                    <th>Correo Medico</th>
                    <th>Correo Paciente</th>
                    <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        assignments.map((assignment) => (
                            <TableItemAssignment
                            key={assignment.id}
                            id={assignment.id}
                            email_doctor={assignment.email_doctor}
                            email_paciente={assignment.email_paciente}
                            id_doctor={assignment.id_doctor}
                            id_paciente={assignment.id_paciente}
                            />
                        ))
                    }
                </tbody>
                </table>
            </div>
        </React.Fragment>
  )
}
