/* eslint-disable no-unused-vars */
import { useState, useEffect, useCallback } from 'react'
import { Menu } from '../../components/menu/menu'
import { PacientesAdmin } from '../../components/tablas/pacientes/pacientes-admin'
import styles from './pacientes-page.module.css'
import { getAllPatients } from '../../firebase/utils/admin'
import { useUser } from '../../hooks/useUser'
import { ProfileModal } from '../../components/modals/profile-modal/profile-modal'

export function PacientesPageAdminRender() {
  const [patients, setPatients] = useState([])
  const [selectedRowId, setSelectedRowId] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [isEditing, setIsEditing] = useState(false)

  const user = useUser()

  useEffect(() => {
    if (user.role === 'doctor') {
      setPatients(user.pacientes_asignados)
      return
    }
    setLoading(true)
    getAllPatients()
      .then(setPatients)
      .catch((err) => setError(err?.message))
      .finally(() => setLoading(false))
  }, [user])

  const deletePatient = useCallback(
    (id) => {
      setPatients((prev) => prev.filter((el) => el.id !== id))
    },
    [patients],
  )

  if (!user) return null

  return (
    <>
      <Menu
        patient={patients.find((el) => el.id === selectedRowId)}
        setIsEditing={setIsEditing}
      />
      <section className={styles.tableSection}>
        <h1 className={styles.heading}>Todos los pacientes</h1>
        <PacientesAdmin
          patients={patients}
          selectedRowId={selectedRowId}
          setSelectedRowId={setSelectedRowId}
        />
      </section>
      {isEditing && (
        <ProfileModal
          selectedRowId={selectedRowId}
          deletePatient={deletePatient}
          setIsEditing={setIsEditing}
        />
      )}
    </>
  )
}
