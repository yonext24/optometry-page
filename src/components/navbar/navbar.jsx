import { useLocation } from 'react-router-dom'
import { useUser } from '../../hooks/useUser'
import { USER_POSSIBLE_STATES } from '../../utils/user-possible-states'
import { NavbarEntry } from './navbar-entry'
import { NavbarLoginEntry } from './navbar-login-entry'
import styles from './navbar.module.css'

const entrys = [
  { name: 'Inicio', href: '/' },
  { name: 'Contacto', href: '/contacto' },
  { name: 'Dashboard', href: '/dashboard' }
]

export function Navbar () {
  const user = useUser()
  const { pathname } = useLocation()

  return <nav className={styles.nav}>
      <img className='' src='/logo.webp' height={35} />
      <div className={styles.entrysContainer}>
        {
          entrys.map(el => <NavbarEntry key={el.name} {...el} isSelected={pathname === el.href} />)
        }
      </div>
      <div className={styles.loginContainer}>
        {
          user === USER_POSSIBLE_STATES.NOT_LOGGED
            ? <NavbarLoginEntry />
            : null
        }
      </div>
  </nav>
}
