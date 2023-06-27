import { Spinner } from '../../spinner/spinner'
import styles from './asignacion-dashboard.module.css'
import { PersonEntry } from './person-entry'
import { TableError } from './table-error'

function AsignacionDoctorsTableRender ({ data, selectedDoctor, refetch, setSelectedDoctor }) {
  return <div className={styles.tableData}>
    {
      data.loading
        ? <Spinner style={{ height: 15, width: 15, color: 'var(--azul-profundo)' }} />
        : data.error
          ? <TableError refetch={refetch} err={data.error} />
          : data.data
            ? data.data.map(el => (
              <PersonEntry key={el.id} data-selected={el.id === selectedDoctor?.id} className={styles.person} onClick={() => setSelectedDoctor(el)}>
                <div id={'userImage'} />
                <span>Dr. {el.nombre} {el.apellido}</span>
              </PersonEntry>
            )
            )
            : null
    }
  </div>
}

export function AsignacionDoctorsTable ({ doctorsData, refetch, setSelectedDoctor, selectedDoctor }) {
  return <div className={styles.doctorsTable} data-loading={doctorsData.loading}>
    <header>Médicos</header>
    <AsignacionDoctorsTableRender data={doctorsData} refetch={refetch} setSelectedDoctor={setSelectedDoctor} selectedDoctor={selectedDoctor} />
  </div>
}
