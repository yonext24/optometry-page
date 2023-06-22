import { NavbarEntry } from './navbar-entry'
import styles from './navbar.module.css'

const entrys = [
  { name: 'Inicio', href: '/' },
  { name: 'Contacto', href: '/contacto' },
  { name: 'Dashboard', href: '/dashboard' }
]

export function Navbar () {
  return <nav className={styles.nav}>
    <div style={{ width: 150, height: 50, backgroundColor: 'red' }} />
    {
      entrys.map(el => <NavbarEntry key={el.name} {...el} />)
    }
  </nav>
}
