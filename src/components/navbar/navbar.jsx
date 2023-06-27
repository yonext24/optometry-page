import { useLocation } from 'react-router-dom'
import { useUser } from '../../hooks/useUser'
import { USER_POSSIBLE_STATES } from '../../utils/user-possible-states'
import { NavbarEntry } from './navbar-entry'
import { NavbarLoginEntry } from './navbar-login-entry'
import styles from './navbar.module.css'
import { NavbarUserEntry } from './navbar-user-entry'

const entrys = [
  { name: 'Inicio', href: '/' },
  { name: 'Contacto', href: '/contacto' }
]
const adminEntrys = [
  { name: 'Pacientes', href: '/pacientes' },
  { name: 'Dashboard', href: '/dashboard/asignacion' }
]
const doctorEntrys = [
  { name: 'Pacientes', href: '/pacientes' }
]
const patientEntrys = [
  { name: 'Progreso', href: '/progreso' }
]

export function Navbar () {
  const user = useUser()
  const userEntrys = user === USER_POSSIBLE_STATES.NOT_KNOWN || USER_POSSIBLE_STATES.NOT_LOGGED
    ? []
    : user?.role === 'admin'
      ? adminEntrys
      : user?.role === 'doctor'
        ? doctorEntrys
        : patientEntrys

  const { pathname } = useLocation()

  return <nav className={styles.nav}>
      <img className='' src='/logo.webp' height={35} />
      <div className={styles.entrysContainer}>
        {
          entrys.map(el => <NavbarEntry key={el.name} {...el} isSelected={pathname === el.href} />)
        }
        {
          userEntrys.map(el => <NavbarEntry key={el.name} {...el} isSelected={pathname === el.href} />)
        }
      </div>
      <div className={styles.loginContainer}>
        {
          user === USER_POSSIBLE_STATES.NOT_LOGGED
            ? <NavbarLoginEntry />
            : <NavbarUserEntry />
        }
      </div>
  </nav>
}
