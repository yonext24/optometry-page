import { Spinner } from '../../spinner/spinner'
import styles from './asignacion-dashboard.module.css'
import { PersonEntry } from './person-entry'

function AsignacionPacientesTableRender ({ data, selectedDoctor, assignPatient }) {
  return <div className={styles.tableData}>
    {
      data.loading
        ? <Spinner style={{ height: 15, width: 15, color: 'var(--azul-profundo)' }} />
        : data.error
          ? <span>{data.error}</span>
          : data.data
            ? data.data.map(el => <PersonEntry key={el.id}>
              {
                el.image?.url
                  ? <img className={styles.userImage} src={el.image.url} alt='Foto de usuario' />
                  : <div id={'userImage'} />
              }
              <span>{el.nombre} {el.apellido}</span>
              <p style={{ fontWeight: 'normal' }}>DNI {el.documento}</p>
              {
                selectedDoctor && <button onClick={() => { assignPatient({ patient: el, doctor: selectedDoctor }) }} className={styles.assign}>Asignar</button>
              }
            </PersonEntry>
            )
            : null
    }
  </div>
}

export function AsignacionPatientsTable ({ patientsData, selectedDoctor, assignPatient }) {
  return <div className={styles.patientsTable} data-loading={patientsData.loading}>
    <header>Pacientes disponibles (sin médico)</header>
    <AsignacionPacientesTableRender data={patientsData} selectedDoctor={selectedDoctor} assignPatient={assignPatient} />
  </div>
}
