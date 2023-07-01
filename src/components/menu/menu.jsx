import { Link } from 'react-router-dom'
import { EditIcon } from '../icons/edit'
import { EyeIcon } from '../icons/eye'
import styles from './menu.module.css'

export function Menu ({ patient, setIsEditing }) {
  return <section className={`${styles.menu} ${patient ?? styles.closed}`}>
    {
      !patient
        ? null
        : (
            <>
              <header>
                <div id={'userImage'} />
                <h4>{patient?.nombre}</h4>
              </header>
              <button style={{ border: 'none' }} onClick={() => setIsEditing(true)}>
                <EditIcon height={36} width={36} style={{ color: 'transparent', stroke: 'black', strokeWidth: 1 }} />
                <h4>Editar</h4>
              </button>
              <Link to={`/paciente/${patient.id}`}>
                <EyeIcon height={36} width={36} style={{ color: 'transparent', stroke: 'black', strokeWidth: 1 }} />
                <h4>Ver</h4>
              </Link>
            </>
          )
    }
  </section>
}
