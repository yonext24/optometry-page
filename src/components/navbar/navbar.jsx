import { useLocation } from 'react-router-dom'
import { useUser } from '../../hooks/useUser'
import { USER_POSSIBLE_STATES } from '../../utils/user-possible-states'
import { NavbarEntry } from './navbar-entry'
import { NavbarLoginEntry } from './navbar-login-entry'
import styles from './navbar.module.css'
import { NavbarUserEntry } from './navbar-user-entry'

const entrys = [
  { name: 'Contacto', includes: '/contacto', href: '/contacto' }
]
const adminEntrys = [
  { name: 'Pacientes', includes: '/pacientes', href: '/pacientes' },
  { name: 'Dashboard', includes: '/dashboard', href: '/dashboard/asignacion' }
]
const doctorEntrys = [
  { name: 'Pacientes', includes: '/pacientes', href: '/pacientes' }
]
const patientEntrys = [
  { name: 'Progreso', includes: '/progreso', href: '/progreso' }
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
        <NavbarEntry name='Inicio' href='/' isSelected={pathname === '/'} />
        {
          entrys.map(el => <NavbarEntry key={el.name} {...el} isSelected={pathname.includes(el.includes)} />)
        }
        {
          userEntrys.map(el => <NavbarEntry key={el.name} {...el} isSelected={pathname.includes(el.includes)} />)
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
