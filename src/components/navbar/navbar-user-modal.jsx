/* eslint-disable no-unused-vars */
import { Link } from 'react-router-dom'
import styles from './navbar.module.css'
import { cerrarSesion } from '../../firebase/utils/user'

const entrys = [
  { name: 'Mi perfil', href: '/perfil' }
]

export function NavbarUserModal () {
  const handleClick = async () => {
    await cerrarSesion()
  }
  return <div className={styles.userModal} >
    {
      entrys.map(el => <Link key={el.href}>{el.name}</Link>)
    }
    <button onClick={handleClick}>Cerrar Sesión</button>
  </div>
}
