export function CalendarEvent({ event, timeText }) {
  const { status } = event.extendedProps
  const { patient, doctor } = status

  return (
    <div
      title={
        patient === 'pending' || doctor === 'pending'
          ? 'Pendiente'
          : 'Confirmada'
      }
      style={{
        width: '100%',
        borderRadius: 5,
        display: 'flex',
        gap: 5,
        backgroundColor:
          patient === 'pending' || doctor === 'pending'
            ? 'rgb(var(--amarillo))'
            : 'green',
      }}>
      <b>{timeText}</b>
      <i>{event.title}</i>
    </div>
  )
}
