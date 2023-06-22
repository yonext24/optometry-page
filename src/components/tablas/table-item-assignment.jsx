import React from 'react'
import { deleteAssignment } from '../../firebase/CRUD/crudAsginacion'

export function TableItemAssignment (props) {
  async function handleDelete () {
    const confirm = prompt('Seguro que deseas borrar esta asignacion si/no')

    if (confirm.toLowerCase() === 'si') {
      await deleteAssignment(props.id)

      setTimeout(() => {
        window.location.reload()
      }, 4000)
    }
  }

  return (
        <React.Fragment>
            <tr key={props.id}>
                <td>{props.email_doctor}</td>
                <td>{props.email_paciente}</td>
                <td><button onClick={handleDelete} className="btn btn-light"><i className="bi bi-trash"></i></button></td>
            </tr>
        </React.Fragment>
  )
}
