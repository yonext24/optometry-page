/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react'
import { useUser } from '../../../hooks/useUser'
import { getAllPatients } from '../../../firebase/utils/admin'
import { PacienteRow } from './paciente-row'
import styles from './pacientes.module.css'

export function PacientesAdmin () {
  const [patients, setPatients] = useState([])
  const [selectedRowId, setSelectedRowId] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  console.log({ selectedRowId })

  const user = useUser()
  if (!user) return null

  useEffect(() => {
    setLoading(true)
    getAllPatients()
      .then(setPatients)
      .catch(err => setError(err?.message))
      .finally(() => setLoading(false))
  }, [])
  console.log(patients)

  return <table className={styles.table}>
    <thead>
      <tr>
        <th>Nombre y apellido</th>
        <th>Correo</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody>
      {
        patients.map(el => <PacienteRow key={el.id} isSelected={el.id === selectedRowId} handleClick={() => { setSelectedRowId(el.id) }} {...el} />)
      }
    </tbody>
  </table>
}
