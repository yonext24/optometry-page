import styles from './calendario.module.css'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'

export function Calendario() {
  return (
    <main className={styles.main}>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView='dayGridMonth'
        editable={false}
        locale={'es'}
        events={[{ title: 'test', date: Date.now() }]}
      />
    </main>
  )
}
