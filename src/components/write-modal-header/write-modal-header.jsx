import { UserImage } from '../common/entry-placeholder/user-image/user-image'
import styles from './write-modal-header.module.css'

export function WriteModalHeader({ user, medic }) {
  return (
    <header className={styles.header}>
      <UserImage src={user?.image?.src} />
      <div className={styles.name}>
        <h4>
          {user.nombre} {user.apellido}
        </h4>
        <span>
          {user.role} {medic && ' - Tu médico asignado.'}
        </span>
      </div>
    </header>
  )
}
