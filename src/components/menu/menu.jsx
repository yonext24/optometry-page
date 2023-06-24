import { EditIcon } from '../icons/edit'
import styles from './menu.module.css'

export function Menu () {
  return <section className={styles.menu}>
    <header>
      <div className={styles.userImage} />
      <h4>patient2</h4>
    </header>
    <div>
      <EditIcon height={36} width={36} style={{ color: 'transparent', stroke: 'black', strokeWidth: 1 }} />
      <h4>Editar</h4>
    </div>
  </section>
}
