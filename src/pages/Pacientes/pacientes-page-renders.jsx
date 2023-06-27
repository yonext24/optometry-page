/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react'
import { Menu } from '../../components/menu/menu'
import { PacientesAdmin } from '../../components/tablas/pacientes/pacientes-admin'
import styles from './pacientes-page.module.css'
import { getAllPatients } from '../../firebase/utils/admin'
import { useUser } from '../../hooks/useUser'

export function PacientesPageAdminRender () {
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

  return <>
      <Menu patient={patients.find(el => el.id === selectedRowId)} />
      <section className={styles.tableSection}>
        <h1 className={styles.heading}>Todos los pacientes</h1>
        <PacientesAdmin patients={patients} selectedRowId={selectedRowId} setSelectedRowId={setSelectedRowId} />
      </section>
    </>
}
