import { useUser } from '../../hooks/useUser'
import styles from '../../pages/Appointment/appointment.module.css'

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

export function AppointmentStatus({ data }) {
  const user = useUser()

  const doctorStatus = data?.status.doctor
  const patientStatus = data?.status.patient

  console.log({ doctorStatus, patientStatus, data })

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

      <div className={styles.horizontal}>
        {data.patientData.id === user.id ||
          (data.doctorData.id === user.id && (
            <>
              <button>Confirmar</button>
              <button>Cancelar</button>
            </>
          ))}
      </div>
    </div>
  )
}
