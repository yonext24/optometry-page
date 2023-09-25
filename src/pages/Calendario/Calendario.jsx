import styles from './calendario.module.css'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import { CalendarEvent } from '../../components/calendar/calendar-event'
import { useCalendar } from '../../hooks/useCalendar'

export function Calendario({ isPatient }) {
  const { calendarData } = useCalendar({ isPatient })

  return (
    <main className={styles.main}>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView='dayGridMonth'
        editable={false}
        // eventClick={(e) => {
        //   console.log(e.view.getCurrentData())
        // }}
        eventContent={CalendarEvent}
        locale={'es'}
        events={calendarData}
        defaultTimedEventDuration={{ minutes: 1 }}
        buttonText={{
          day: 'Hoy',
          prev: 'Anterior',
          next: 'Siguiente',
          today: 'Hoy',
          month: 'Mes',
          week: 'Semana',
          dayGridMonth: 'Mes',
          dayGridWeek: 'Semana',
          dayGridDay: 'Día',
        }}
      />
    </main>
  )
}
