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

  return <nav className={styles.nav}>
      <div>
        <div style={{ width: 150, height: 50, backgroundColor: 'red' }} />
        {
          entrys.map(el => <NavbarEntry key={el.name} {...el} />)
        }
    </div>
    <div>
      {
        user === USER_POSSIBLE_STATES.NOT_LOGGED
          ? <NavbarLoginEntry />
          : null
      }
    </div>
  </nav>
}
