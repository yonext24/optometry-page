/* eslint-disable no-unused-vars */
import { useState } from 'react'
import styles from './navbar.module.css'
import { useUser } from '../../hooks/useUser'
import { DownArrowIcon } from '../icons/down-arrow'
import { NavbarUserModal } from './navbar-user-modal'

export function NavbarUserEntry () {
  const [open, setOpen] = useState(false)
  const user = useUser()

  if (!user) return null

  return <div className={styles.userEntry}>
    <button onClick={() => { setOpen(prev => !prev) }} className={styles.userEntry} >
      {
        user.photo !== ''
          ? <img className={styles.userImage} src={user.photo} height={36} width={36} />
          : <div className={styles.userImage + ' ' + styles.imagePlaceholder} />
      }
      <span>{user.nombre} {user.apellido}</span>
      <DownArrowIcon width={10} />
    </button>
    {
      open && <NavbarUserModal />
    }
  </div>
}
