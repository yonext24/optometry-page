import { Link, useLocation } from 'react-router-dom'
import styles from './user-layout.module.css'

export function UserLayout ({ children }) {
  const location = useLocation()
  return <>
    <header className={styles.menu}>
      <Link className={`${styles.menuEntry} ${location.pathname === '/dashboard/asignacion' ? styles.selected : ''}`} to='/dashboard/asignacion'>
        Deberes
      </Link>
      <Link className={`${styles.menuEntry} ${location.pathname.includes('/usuario/') ? styles.selected : ''}`} to='/dashboard/register'>
        Perfil
      </Link>
    </header>
    {children}
  </>
}
