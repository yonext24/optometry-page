import styles from './calendario.module.css'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import { useUser } from '../../hooks/useUser'
import { useEffect, useState } from 'react'
import { getAllDoctorAppointments } from '../../firebase/utils/appointment'
import { useNavigate, useParams } from 'react-router-dom'

export function Calendario() {
  const [calendarData, setCalendarData] = useState([])

  const user = useUser()

  const navigate = useNavigate()
  const { id } = useParams()

  useEffect(() => {
    if (!user) return
    if (!(user.role !== 'admin' || user.id !== id))
      navigate('/login', { replace: true })
    getAllDoctorAppointments(id).then((res) => {
      if (res.length === 0 || !res) return
      setCalendarData(
        res.map((el) => ({
          ...el[0].content,
          url: el[0].url,
          title: `${el[0].patientData.nombre} ${el[0].patientData.apellido}`,
        })),
      )
    })
  }, [user])

  console.log({ calendarData })

  return (
    <main className={styles.main}>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView='dayGridMonth'
        editable={false}
        // eventClick={(e) => {
        //   console.log(e.view.getCurrentData())
        // }}
        eventContent={renderEventContent}
        locale={'es'}
        events={calendarData}
      />
    </main>
  )
}

function renderEventContent(eventData) {
  console.log(eventData.event.title)
  return (
    <>
      <b>{eventData.timeText}</b>
      <i>{eventData.event.title}</i>
    </>
  )
}
