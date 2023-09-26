import { useNavigate, useParams } from 'react-router-dom'
import styles from './appointment.module.css'
import { useEffect, useMemo, useState } from 'react'
import { getSingleAppointment } from '../../firebase/utils/appointment'
import { useUser } from '../../hooks/useUser'
import { USER_POSSIBLE_STATES } from '../../utils/user-possible-states'
import { Spinner } from '../../components/spinner/spinner'
import { AppointmentHeader } from '../../components/appointment/appointment-header'
import { AppointmentStatus } from '../../components/appointment/appointment-status'

function UserLoadingRender({ children, user, status, data }) {
  if (user === USER_POSSIBLE_STATES.NOT_KNOWN || status === 'loading' || !data)
    return (
      <div className={styles.loading}>
        <Spinner
          style={{
            color: 'rgba(0,0,0,.2)',
            height: 20,
            width: 20,
            borderWidth: 3,
          }}
        />
      </div>
    )

  return children
}

export function Appointment() {
  const [status, setStatus] = useState(null)
  const [data, setData] = useState(null)

  const user = useUser()
  const params = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    if (user === USER_POSSIBLE_STATES.NOT_KNOWN) return
    if (user === USER_POSSIBLE_STATES.NOT_LOGGED)
      navigate('/login', { replace: true })
    if (!params.appointmentId || !params.doctorId || !params.number) {
      setStatus('error')
      return
    }
    setStatus('loading')
    getSingleAppointment(params)
      .then((appointment) => {
        setData(appointment)
        setStatus('success')
      })
      .catch((e) => {
        console.log(e)
        setStatus('error')
      })
  }, [user])

  const parsedDate = useMemo(() => {
    if (!data) return ''
    const [date, time] = data.content.date.split('T')

    const [year, month, day] = date.split('-')
    return `${day}/${month}/${year} a las ${time}hs`
  }, [data])

  return (
    <main className={styles.main}>
      <UserLoadingRender user={user} status={status} data={data}>
        <section className={styles.card}>
          <span className={styles.date}>{parsedDate}</span>
          <AppointmentHeader user={user} data={data} />
          <p className={styles.for}>
            Citación para {data?.patientData?.nombre}{' '}
            {data?.patientData?.apellido}
          </p>
          <article className={styles.body}>
            <h1>{data?.content?.title}</h1>
            <p>{data?.content?.descripcion}</p>
          </article>

          <AppointmentStatus data={data} setData={setData} />
        </section>
      </UserLoadingRender>
    </main>
  )
}
