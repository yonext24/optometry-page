import { useState } from 'react'
import { useUser } from '../../hooks/useUser'
import styles from '../../pages/Appointment/appointment.module.css'
import { Spinner } from '../spinner/spinner'
import { confirmAppointment } from '../../firebase/utils/appointment'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

const statusStyles = {
  pending: {
    backgroundColor: 'rgb(var(--amarillo))',
  },
  confirmed: {
    backgroundColor: 'rgb(0, 255, 0)',
  },
}

const statusNames = {
  pending: 'Pendiente',
  confirmed: 'Confirmada',
}

export function AppointmentStatus({ data, setData }) {
  const [isLoading, setisLoading] = useState({ patient: false, doctor: false })
  const user = useUser()

  const doctorStatus = data?.status.doctor
  const patientStatus = data?.status.patient

  const showButtons =
    data.status[user.role] === 'pending' &&
    data[`${user.role}Data`].id === user.id

  const params = useParams()

  const handleConfirm = () => {
    setisLoading((prev) => ({ ...prev, [user.role]: true }))
    confirmAppointment({ ...params, byDoctor: user.role === 'doctor' })
      .then(() => {
        toast('Confirmaste la cita correctamente.')
        setData((prev) => ({
          ...prev,
          status: { ...prev.status, [user.role]: 'confirmed' },
        }))
      })
      .catch((err) => console.log({ err }))
      .finally(() => {
        setisLoading((prev) => ({ ...prev, [user.role]: false }))
      })
  }

  return (
    <div className={styles.estado}>
      <p>Estado de la cita</p>
      <div className={styles.horizontal}>
        <div>
          <p>Paciente</p>
          <div className={styles.status} style={statusStyles[patientStatus]}>
            {statusNames[patientStatus]}
          </div>
        </div>
        <div>
          <p>Profesional</p>
          <div className={styles.status} style={statusStyles[doctorStatus]}>
            {statusNames[doctorStatus]}
          </div>
        </div>
      </div>

      <div className={styles.buttons}>
        {showButtons && (
          <>
            <button
              className={styles.confirm}
              onClick={handleConfirm}
              disabled={isLoading[user.role]}>
              {isLoading[user.role] ? (
                <Spinner style={{ height: 8, width: 8 }} />
              ) : (
                'Confirmar'
              )}
            </button>
            <button disabled={isLoading[user.role]}>
              {isLoading[user.role] ? (
                <Spinner style={{ height: 8, width: 8 }} />
              ) : (
                'Cancelar'
              )}
            </button>
          </>
        )}
      </div>
    </div>
  )
}
