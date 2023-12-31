import { PacienteRow } from './paciente-row'
import styles from './pacientes.module.css'

export function PacientesAdmin({
  patients,
  selectedRowId,
  setSelectedRowId,
  setSelectedPatient,
}) {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Nombre y apellido</th>
          <th>Correo</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {patients.map((el) => (
          <PacienteRow
            key={el.id}
            isSelected={el.id === selectedRowId}
            handleClick={() => {
              setSelectedRowId(el.id)
              setSelectedPatient(el)
            }}
            {...el}
          />
        ))}
      </tbody>
    </table>
  )
}
