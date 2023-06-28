import { Spinner } from '../../spinner/spinner'
import styles from './asignacion-dashboard.module.css'
import { PersonEntry } from './person-entry'

function AsignacionAssignedRender ({ data, deassignPatient, selectedDoctor }) {
  return <div className={styles.tableData}>
    {
      data.loading
        ? <Spinner style={{ height: 15, width: 15, color: 'var(--azul-profundo)', margin: 'auto' }} />
        : data.error
          ? <span>{data.error}</span>
          : data.data
            ? data.data.map(el => (
              <PersonEntry key={el.id} className={styles.person}>
                <div id={'userImage'} />
                <span>{el.nombre} {el.apellido}</span>
                <button onClick={() => deassignPatient({ patient: el, doctor: selectedDoctor })} className={styles.assign}>Quitar</button>
              </PersonEntry>
            )
            )
            : null
    }
  </div>
}

export function AsignacionSelectedTable ({ assignedData, deassignPatient, selectedDoctor }) {
  if (!assignedData.data) return null
  return <div className={styles.assignedTable}>
    <header>Pacientes asignados al Dr. {selectedDoctor.nombre} {selectedDoctor.apellido}</header>
    {
      <AsignacionAssignedRender data={assignedData} deassignPatient={deassignPatient} selectedDoctor={selectedDoctor} />
    }
  </div>
}
