import { EditIcon } from '../icons/edit'
import styles from './menu.module.css'

export function Menu ({ patient }) {
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
              <div>
                <EditIcon height={36} width={36} style={{ color: 'transparent', stroke: 'black', strokeWidth: 1 }} />
                <h4>Editar</h4>
              </div>
            </>
          )
    }
  </section>
}
